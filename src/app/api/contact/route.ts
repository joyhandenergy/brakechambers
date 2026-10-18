import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { EMAIL_REGEX } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Basic server-side sanity checks
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
    const pass = process.env.SMTP_PASS;
    const recipient = process.env.SALES_EMAIL || 'sales@brakechambers.com';

    // Format all submitted fields into a clean HTML table (excluding complex objects)
    const detailRows = Object.entries(data)
      .filter(([key, val]) => !['source', 'items', 'products', 'productImages'].includes(key) && val !== undefined && val !== '')
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

    // If SMTP_PASS is configured, send the real email via 163 Enterprise Mail
    if (pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure, // true for port 465
        auth: {
          user,
          pass,
        },
      });

      await transporter.sendMail({
        from: `"BRC Website Lead" <${user}>`,
        to: recipient,
        replyTo: clientEmail,
        subject: emailSubject,
        html: htmlContent,
      });

      console.log(`[SMTP SUCCESS] Sent email to ${recipient} via ${host}:${port}`);
    } else {
      // In development or if password is not set yet in .env.local
      console.log('--- [DEV MODE] NEW LEAD RECEIVED (SMTP_PASS not yet set) ---');
      console.log(`Target Inbox: ${recipient}`);
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
    return NextResponse.json(
      { error: error?.message || 'Failed to submit inquiry. Please try again or email us directly at sales@brakechambers.com' },
      { status: 500 }
    );
  }
}
