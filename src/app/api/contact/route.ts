import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { EMAIL_REGEX } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// In-memory sliding-window rate limiter (cleans up automatically)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(identifier: string, limit = 6, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (record && now > record.expiresAt) {
    rateLimitMap.delete(identifier);
  }

  const current = rateLimitMap.get(identifier);
  if (!current) {
    rateLimitMap.set(identifier, { count: 1, expiresAt: now + windowMs });
    return false;
  }

  if (current.count >= limit) {
    return true;
  }

  current.count++;
  return false;
}

export async function POST(request: Request) {
  let activePass = '';
  try {
    const data = await request.json();

    // 1. Anti-spam Honeypot: Automated spambots fill in hidden fields
    if (data._honeypot || data.website_url || data.fax) {
      console.warn('[SPAM BOT BLOCKED] Honeypot field triggered.');
      // Return 200 silently so bots believe they succeeded and stop retrying
      return NextResponse.json({ message: 'Inquiry received', success: true });
    }

    // 2. Cloudflare & Proxy IP Rate Limiting (Max 6 requests per 10 mins per IP)
    const clientIp =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'anonymous';

    if (clientIp !== 'anonymous' && isRateLimited(clientIp, 6, 10 * 60 * 1000)) {
      console.warn(`[RATE LIMIT EXCEEDED] IP: ${clientIp}`);
      return NextResponse.json(
        { error: 'Too many submissions from this connection. Please wait 10 minutes or contact our WhatsApp desk directly.' },
        { status: 429 }
      );
    }

    // 3. Basic server-side sanity checks
    const source = data.source || 'Website Lead';
    const clientEmail = (data.email || '').trim();
    const clientName = (data.fullName || data.name || data.contactName || '').trim();
    const company = (data.company || data.companyName || '').trim();

    if (!clientEmail || !EMAIL_REGEX.test(clientEmail)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST || 'smtp.qiye.163.com';
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE !== 'false';
    const user = process.env.SMTP_USER || 'sales@brakechambers.com';
    let rawPass = (process.env.SMTP_PASS || 'M5@vyrJJtJDL#M7#').trim();
    if ((rawPass.startsWith('"') && rawPass.endsWith('"')) || (rawPass.startsWith("'") && rawPass.endsWith("'"))) {
      rawPass = rawPass.slice(1, -1).trim();
    }
    const pass = rawPass;
    activePass = pass;
    
    // Support multiple comma-separated inboxes (sales@brakechambers.com, brcbrakechambers@gmail.com)
    const rawRecipients = process.env.SALES_EMAIL || 'sales@brakechambers.com, brcbrakechambers@gmail.com';
    const recipients = Array.from(
      new Set(
        rawRecipients
          .split(',')
          .map((e) => e.trim())
          .filter(Boolean)
      )
    );

    // Format all submitted fields into a clean HTML table (excluding complex objects)
    const detailRows = Object.entries(data)
      .filter(([key, val]) => !['source', 'items', 'products', 'productImages', 'attachment', '_honeypot', 'website_url', 'fax'].includes(key) && val !== undefined && val !== '')
      .map(([key, val]) => {
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase());
        return `
          <tr>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; width: 35%; background: #f8fafc;">${formattedKey}</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #0a1929;">${String(val).replace(/\n/g, '<br/>')}</td>
          </tr>
        `;
      })
      .join('');

    // Handle any uploaded file/photo attachments
    const emailAttachments: Array<{ filename: string; content: Buffer; contentType?: string }> = [];
    let attachmentHtml = '';

    if (data.attachment && typeof data.attachment === 'object' && data.attachment.data) {
      try {
        const fileBuffer = Buffer.from(data.attachment.data, 'base64');
        const filename = data.attachment.filename || 'customer-brake-chamber-photo.jpg';
        const contentType = data.attachment.contentType || 'image/jpeg';
        
        emailAttachments.push({
          filename,
          content: fileBuffer,
          contentType,
        });

        attachmentHtml = `
          <div style="margin-top: 20px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 14px 18px;">
            <div style="font-weight: 700; color: #065f46; font-size: 14px; margin-bottom: 4px;">
              📎 Customer Photo / Specification File Attached: ${filename}
            </div>
            <div style="font-size: 13px; color: #047857;">
              The original file is attached to this email. You can preview or download it directly to inspect the data tag, casting stamps, or port layout.
            </div>
          </div>
        `;
      } catch (err) {
        console.error('Failed to parse attachment buffer', err);
      }
    }

    // Format products / items with images if quote request
    let itemsHtml = '';
    if (Array.isArray(data.products) && data.products.length > 0) {
      const productRows = data.products
        .map((p: any) => {
          const imgUrl = p.imageUrl || p.thumbnail || '';
          const name = p.name || 'Brake Chamber';
          const sku = p.sku || '';
          const qty = p.quantity || 1;
          const stroke = p.strokeSize || '';
          const prodUrl = p.productUrl || '';

          return `
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; width: 70px; text-align: center; vertical-align: middle;">
                ${imgUrl ? `<img src="${imgUrl}" alt="${name}" width="60" height="60" style="width: 60px; height: 60px; object-fit: contain; border-radius: 6px; border: 1px solid #e2e8f0; background: #ffffff; display: block; margin: 0 auto;" />` : `<div style="width: 60px; height: 60px; background: #f1f5f9; border-radius: 6px; line-height: 60px; text-align: center; color: #94a3b8; font-size: 10px;">NO IMAGE</div>`}
              </td>
              <td style="padding: 12px 14px; border-bottom: 1px solid #e2e8f0; vertical-align: middle;">
                <div style="font-size: 14px; font-weight: 700; color: #0a1929;">
                  ${prodUrl ? `<a href="${prodUrl}" style="color: #0a1929; text-decoration: none;">${name}</a>` : name}
                </div>
                <div style="font-size: 12px; color: #64748b; margin-top: 3px;">
                  <span style="font-family: monospace; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0;">SKU: ${sku}</span>
                  ${stroke ? `<span style="margin-left: 8px;">Stroke: ${stroke}</span>` : ''}
                </div>
              </td>
              <td style="padding: 12px 14px; border-bottom: 1px solid #e2e8f0; text-align: right; vertical-align: middle; white-space: nowrap;">
                <span style="display: inline-block; background: #0a1929; color: #ffb000; font-weight: 800; font-size: 13px; padding: 4px 10px; border-radius: 6px;">
                  ${qty} Pcs
                </span>
              </td>
            </tr>
          `;
        })
        .join('');

      itemsHtml = `
        <div style="margin-top: 24px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <div style="background: #0a1929; color: #ffffff; padding: 12px 16px; font-size: 14px; font-weight: 700;">
            <span style="color: #ffb000; text-transform: uppercase; letter-spacing: 0.5px; font-size: 12px;">Requested Brake Chambers (${data.totalUnitsConfigured || ''} Units Total)</span>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
              ${productRows}
            </tbody>
          </table>
        </div>
      `;
    } else if (Array.isArray(data.items) && data.items.length > 0) {
      const itemsList = data.items
        .map((item: string) => `<li style="padding: 6px 0; color: #0a1929;"><strong>${item}</strong></li>`)
        .join('');
      itemsHtml = `
        <div style="margin-top: 20px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 16px;">
          <h3 style="margin-top: 0; color: #92400e; font-size: 16px;">Requested Quote Products:</h3>
          <ul style="margin: 0; padding-left: 20px;">
            ${itemsList}
          </ul>
        </div>
      `;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0a1929;">
        <div style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
          
          <!-- Header -->
          <div style="background: #0a1929; border-top: 5px solid #FFB000; padding: 24px 30px; text-align: left;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">
              BRC <span style="color: #FFB000; font-weight: 400; font-size: 15px; letter-spacing: 1px; text-transform: uppercase;">| ${source}</span>
            </h1>
            <p style="color: #94a3b8; margin: 6px 0 0; font-size: 13px;">New lead received from brakechambers.com</p>
          </div>

          <!-- Body -->
          <div style="padding: 28px 30px;">
            <div style="margin-bottom: 20px; background: #f0fdf4; border-left: 4px solid #22c55e; padding: 12px 16px; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px; color: #166534;">
                <strong>Sender:</strong> ${clientName || 'Website Visitor'} ${company ? `(${company})` : ''} &lt;${clientEmail}&gt;
              </p>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
              ${detailRows}
            </table>

            ${attachmentHtml}

            ${itemsHtml}

            <!-- Quick Reply CTA -->
            <div style="margin-top: 28px; text-align: center;">
              <a href="mailto:${clientEmail}?subject=Re: ${encodeURIComponent(source)} - BRC Brake Chambers" 
                 style="background: #FFB000; color: #0a1929; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px; display: inline-block;">
                Reply Directly to ${clientEmail}
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 30px; text-align: center; font-size: 12px; color: #64748b;">
            This email was automatically generated by BRC Brake Chambers website contact system.<br/>
            Received at: ${new Date().toUTCString()}
          </div>
        </div>
      </body>
      </html>
    `;

    // Subject customization
    const subjectPrefix = source.toUpperCase();
    const subjectLead = company || clientName || clientEmail;
    const emailSubject = `[${subjectPrefix}] New Inquiry from ${subjectLead}`;

    // Plain text alternative for anti-spam filters & high inbox delivery
    const plainTextBody = [
      `BRC INQUIRY: ${source.toUpperCase()}`,
      `========================================`,
      `Sender: ${clientName || 'Website Visitor'} ${company ? `(${company})` : ''} <${clientEmail}>`,
      `Date: ${new Date().toUTCString()}`,
      `========================================`,
      `DETAILS:`,
      ...Object.entries(data)
        .filter(([key, val]) => !['source', 'items', 'products', 'productImages', 'attachment', '_honeypot', 'website_url', 'fax'].includes(key) && val !== undefined && val !== '')
        .map(([key, val]) => `${key}: ${typeof val === 'object' ? JSON.stringify(val) : val}`),
      ...(Array.isArray(data.items) && data.items.length > 0
        ? ['\nREQUESTED ITEMS:', ...data.items.map((i: string) => `- ${i}`)]
        : []),
      ...(Array.isArray(data.products) && data.products.length > 0
        ? ['\nREQUESTED PRODUCTS:', ...data.products.map((p: any) => `- ${p.name || 'Product'} (SKU: ${p.sku || 'N/A'}, Qty: ${p.quantity || 1})`)]
        : [])
    ].join('\n');

    // If SMTP_PASS is configured, dispatch the email directly and ensure delivery
    if (pass) {
      let emailSent = false;
      let lastSmtpError: any = null;

      // 1. Primary Attempt via configured host with IPv4 enforcement
      try {
        const primaryTransporter = nodemailer.createTransport({
          host,
          port,
          secure,
          auth: {
            user,
            pass,
          },
          family: 4, // CRITICAL: Enforce IPv4 to avoid overseas IPv6 DNS timeouts
          connectionTimeout: 20000,
          greetingTimeout: 20000,
          socketTimeout: 30000,
        } as any);

        const sendInfo = await primaryTransporter.sendMail({
          from: `"BRC Website Lead" <${user}>`,
          to: recipients,
          replyTo: clientEmail,
          subject: emailSubject,
          text: plainTextBody,
          html: htmlContent,
          attachments: emailAttachments.length > 0 ? emailAttachments : undefined,
        });

        console.log(`[SMTP SUCCESS] Sent email to [${recipients.join(', ')}] via ${host}:${port} (MessageId: ${sendInfo.messageId})`);
        emailSent = true;
      } catch (primaryErr: any) {
        lastSmtpError = primaryErr;
        console.warn(`[SMTP WARNING] Primary host (${host}) failed: ${primaryErr?.message || primaryErr}. Attempting fallback gateway connection...`);

        // 2. Fallback Attempt via Direct NetEase Gateway IPs (bypasses DNS resolution issues)
        const fallbackIps = ['103.126.92.250', '103.126.92.249', '8.209.113.244'];
        for (const fallbackIp of fallbackIps) {
          try {
            const fallbackTransporter = nodemailer.createTransport({
              host: fallbackIp,
              port: 465,
              secure: true,
              auth: {
                user,
                pass,
              },
              tls: {
                servername: host,
                rejectUnauthorized: false,
              },
              family: 4,
              connectionTimeout: 20000,
              greetingTimeout: 20000,
              socketTimeout: 30000,
            } as any);

            const sendInfo = await fallbackTransporter.sendMail({
              from: `"BRC Website Lead" <${user}>`,
              to: recipients,
              replyTo: clientEmail,
              subject: emailSubject,
              text: plainTextBody,
              html: htmlContent,
              attachments: emailAttachments.length > 0 ? emailAttachments : undefined,
            });

            console.log(`[SMTP SUCCESS] Sent email to [${recipients.join(', ')}] via fallback gateway ${fallbackIp}:465 (MessageId: ${sendInfo.messageId})`);
            emailSent = true;
            break;
          } catch (fallbackErr: any) {
            lastSmtpError = fallbackErr;
            console.warn(`[SMTP WARNING] Fallback gateway ${fallbackIp} failed: ${fallbackErr?.message || fallbackErr}`);
          }
        }
      }

      if (!emailSent) {
        console.error('--- [SMTP SEND FAILURE] ---');
        console.error('All SMTP connection attempts failed. Last error:', lastSmtpError?.message || lastSmtpError);
        console.error('Lead details preserved in server log:', JSON.stringify(data, null, 2));
        if (String(lastSmtpError?.message).includes('ERR.LOGIN.REQCODE')) {
          console.error(
            'CRITICAL NOTE: NetEase 163 Enterprise Mail requires an "App Authorization Code" (客户端专用授权码) rather than the web password.'
          );
        }
        console.error('-----------------------------------------');

        return NextResponse.json(
          {
            error: 'Our mail server is currently experiencing network delays. Please email us directly at sales@brakechambers.com or message our WhatsApp desk.',
            success: false,
          },
          { status: 500 }
        );
      }
    } else {
      // In development or if password is not set yet in .env.local
      console.log('--- [DEV MODE] NEW LEAD RECEIVED (SMTP_PASS not yet set) ---');
      console.log(`Target Inboxes (will receive email once SMTP_PASS is set): ${recipients.join(', ')}`);
      console.log(`Subject: ${emailSubject}`);
      console.log('Data:', data);
      console.log('------------------------------------------------------------');
    }

    return NextResponse.json(
      { message: 'Inquiry submitted successfully', success: true },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing lead submission:', error);
    const isReqCodeError = String(error?.message).includes('ERR.LOGIN.REQCODE');
    const userMessage = isReqCodeError
      ? 'Email server authorization required: NetEase Enterprise Mail requires a 16-character Client Authorization Code rather than the web password.'
      : (error?.message || 'Failed to submit inquiry. Please try again or email us directly at sales@brakechambers.com');

    return NextResponse.json(
      { error: userMessage },
      { status: 500 }
    );
  }
}
