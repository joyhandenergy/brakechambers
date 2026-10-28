/**
 * Cloudflare Edge & Node.js Native SMTPS Mailer
 * Connects directly to NetEase Enterprise Mail over native TLS sockets
 * without relying on buggy Node socket polyfills or third-party email APIs.
 */

export interface SmtpAttachment {
  filename: string;
  content: Buffer;
  contentType?: string;
}

export interface DirectSmtpOptions {
  host: string;
  port: number;
  user: string;
  pass: string;
  recipients: string[];
  clientEmail: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: SmtpAttachment[];
}

function buildMimeMessage(options: DirectSmtpOptions): string {
  const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  const mimeParts: string[] = [
    `From: "BRC Website Lead" <${options.user}>`,
    `To: ${options.recipients.join(', ')}`,
    `Reply-To: ${options.clientEmail}`,
    `Subject: =?UTF-8?B?${Buffer.from(options.subject).toString('base64')}?=`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset=utf-8`,
    `Content-Transfer-Encoding: 8bit`,
    ``,
    options.html,
  ];

  if (options.attachments && options.attachments.length > 0) {
    for (const att of options.attachments) {
      const base64Data = att.content ? att.content.toString('base64') : '';
      mimeParts.push(
        `--${boundary}`,
        `Content-Type: ${att.contentType || 'application/octet-stream'}; name="${att.filename}"`,
        `Content-Disposition: attachment; filename="${att.filename}"`,
        `Content-Transfer-Encoding: base64`,
        ``,
        base64Data
      );
    }
  }

  mimeParts.push(`--${boundary}--`, `.`);
  return mimeParts.join('\r\n');
}

/**
 * 1. Cloudflare Workers native implementation using cloudflare:sockets
 */
async function sendViaCloudflareSockets(options: DirectSmtpOptions, rawMessage: string): Promise<{ success: boolean; message: string }> {
  const cfModuleName = 'cloudflare:sockets';
  // @ts-ignore
  const cf = await import(/* webpackIgnore: true */ cfModuleName);
  if (!cf || !cf.connect) {
    throw new Error('cloudflare:sockets is not available in this runtime');
  }

  const socket = cf.connect(
    { hostname: options.host, port: options.port },
    { secureTransport: 'on' }
  );

  await socket.opened;

  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let readBuffer = '';
  async function readLine(): Promise<string> {
    while (!readBuffer.includes('\r\n')) {
      const { value, done } = await reader.read();
      if (done) break;
      readBuffer += decoder.decode(value, { stream: true });
    }
    const idx = readBuffer.indexOf('\r\n');
    if (idx === -1) {
      const res = readBuffer;
      readBuffer = '';
      return res;
    }
    const line = readBuffer.slice(0, idx);
    readBuffer = readBuffer.slice(idx + 2);
    return line;
  }

  async function readResponse(): Promise<{ code: number; line: string }> {
    let lastLine = '';
    while (true) {
      const line = await readLine();
      if (!line.trim()) continue;
      lastLine = line;
      if (line.length === 3 || line.charAt(3) === ' ') {
        const code = parseInt(line.slice(0, 3), 10);
        return { code, line: lastLine };
      }
    }
  }

  async function send(cmd: string) {
    await writer.write(encoder.encode(cmd + '\r\n'));
  }

  try {
    const greeting = await readResponse();
    if (greeting.code !== 220) throw new Error(`Unexpected greeting: ${greeting.line}`);

    await send('EHLO brakechambers.com');
    const ehlo = await readResponse();
    if (ehlo.code !== 250) throw new Error(`EHLO failed: ${ehlo.line}`);

    await send('AUTH LOGIN');
    const authStart = await readResponse();
    if (authStart.code !== 334) throw new Error(`AUTH LOGIN failed: ${authStart.line}`);

    await send(btoa(options.user));
    const userResp = await readResponse();
    if (userResp.code !== 334) throw new Error(`Username rejected: ${userResp.line}`);

    await send(btoa(options.pass));
    const passResp = await readResponse();
    if (passResp.code !== 235) throw new Error(`Authentication failed: ${passResp.line}`);

    await send(`MAIL FROM:<${options.user}>`);
    const mailFrom = await readResponse();
    if (mailFrom.code !== 250) throw new Error(`MAIL FROM rejected: ${mailFrom.line}`);

    for (const rcpt of options.recipients) {
      await send(`RCPT TO:<${rcpt}>`);
      const rcptResp = await readResponse();
      if (rcptResp.code !== 250) throw new Error(`RCPT TO rejected for ${rcpt}: ${rcptResp.line}`);
    }

    await send('DATA');
    const dataResp = await readResponse();
    if (dataResp.code !== 354) throw new Error(`DATA command rejected: ${dataResp.line}`);

    await writer.write(encoder.encode(rawMessage + '\r\n'));
    const finalResp = await readResponse();
    if (finalResp.code !== 250) throw new Error(`Delivery rejected: ${finalResp.line}`);

    await send('QUIT');
    return { success: true, message: finalResp.line };
  } finally {
    try { reader.releaseLock(); } catch (_) {}
    try { writer.releaseLock(); } catch (_) {}
    try { await socket.close(); } catch (_) {}
  }
}

/**
 * 2. Node.js native TLS implementation (Localhost & standard Node environments)
 */
async function sendViaNodeTls(options: DirectSmtpOptions, rawMessage: string): Promise<{ success: boolean; message: string }> {
  const tls = await import('tls');

  return new Promise((resolve, reject) => {
    const socket = tls.connect(options.port, options.host, { servername: options.host }, () => {
      // TLS connection established
    });

    let buffer = '';
    let step = 0;
    let rcptIndex = 0;

    socket.setEncoding('utf8');

    function send(cmd: string) {
      socket.write(cmd + '\r\n');
    }

    socket.on('data', (data: string) => {
      buffer += data;
      const lines = buffer.split('\r\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.trim()) continue;
        const code = parseInt(line.slice(0, 3), 10);
        const isLastLine = line.length === 3 || line.charAt(3) === ' ';
        if (!isLastLine) continue;

        if (code >= 400) {
          socket.end();
          return reject(new Error(`SMTP error ${code}: ${line}`));
        }

        if (step === 0 && code === 220) {
          step = 1;
          send('EHLO brakechambers.com');
        } else if (step === 1 && code === 250) {
          step = 2;
          send('AUTH LOGIN');
        } else if (step === 2 && code === 334) {
          step = 3;
          send(Buffer.from(options.user).toString('base64'));
        } else if (step === 3 && code === 334) {
          step = 4;
          send(Buffer.from(options.pass).toString('base64'));
        } else if (step === 4 && code === 235) {
          step = 5;
          send(`MAIL FROM:<${options.user}>`);
        } else if ((step === 5 || step === 6) && code === 250) {
          if (rcptIndex < options.recipients.length) {
            step = 6;
            const target = options.recipients[rcptIndex++];
            send(`RCPT TO:<${target}>`);
          } else {
            step = 7;
            send('DATA');
          }
        } else if (step === 7 && code === 354) {
          step = 8;
          socket.write(rawMessage + '\r\n');
        } else if (step === 8 && code === 250) {
          step = 9;
          send('QUIT');
          socket.end();
          return resolve({ success: true, message: line });
        }
      }
    });

    socket.on('error', reject);
    socket.setTimeout(12000, () => {
      socket.destroy();
      reject(new Error('SMTP Connection timed out (12s)'));
    });
  });
}

/**
 * Universal Native SMTPS Sender
 * Automatically uses Cloudflare native sockets when deployed to Cloudflare Workers,
 * and falls back to Node.js TLS on local machines.
 */
export async function sendDirectSmtp(options: DirectSmtpOptions): Promise<{ success: boolean; message: string }> {
  const rawMessage = buildMimeMessage(options);

  // Attempt 1: Cloudflare Workers Native Sockets
  try {
    const res = await sendViaCloudflareSockets(options, rawMessage);
    return res;
  } catch (cfErr: any) {
    // If not in Cloudflare environment or cloudflare:sockets failed, try Node TLS
    // console.warn('Cloudflare sockets not available, falling back to Node TLS:', cfErr?.message);
  }

  // Attempt 2: Node.js TLS Socket
  return sendViaNodeTls(options, rawMessage);
}
