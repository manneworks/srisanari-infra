import { ContactFormData } from '../types';

export const getContactEmailTemplate = (data: ContactFormData) => {
  const { name, email, phone, subject, message } = data;
  
  return {
    subject: `New Contact Form: ${subject || 'Enquiry from Website'}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Subject: ${subject || 'No Subject'}
      
      Message:
      ${message}
    `,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body { 
          font-family: 'Open Sans', Arial, sans-serif; 
          line-height: 1.6; 
          color: #333333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
          background-color: #ffffff;
        }
        .header { 
          background-color: #212d45;
          color: white; 
          padding: 25px 20px; 
          text-align: center; 
          border-radius: 0;
        }
        .header h2 {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          margin: 0 0 10px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .content { 
          padding: 25px; 
          border: 1px solid #e5e7eb; 
          border-top: none; 
          border-radius: 0 0 8px 8px; 
          background-color: #ffffff;
        }
        .footer { 
          margin-top: 30px; 
          font-size: 12px; 
          color: #666666; 
          text-align: center; 
          padding-top: 20px;
          border-top: 1px solid #f0f0f0;
        }
        .field { 
          margin-bottom: 18px;
          font-size: 15px;
        }
        .field-label { 
          font-weight: 600; 
          color: #212d45;
          display: block;
          margin-bottom: 4px;
          font-family: 'Montserrat', sans-serif;
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: 0.5px;
        }
        .field-value {
          color: #333333;
          padding-left: 5px;
        }
        .message { 
          background-color: #f8f9fa;
          padding: 15px; 
          border-radius: 4px; 
          margin-top: 8px; 
          white-space: pre-line;
          border-left: 3px solid #ffc03d;
        }
        .logo { 
          max-width: 180px; 
          margin: 0 auto 15px auto;
          display: block;
        }
        .accent-color {
          color: #ffc03d;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>New Contact Form Submission</h2>
        <p>From: Sri Sanari Infra Website</p>
      </div>
      
      <div class="content">
        <div class="field">
          <span class="field-label">Name:</span>
          <div>${name}</div>
        </div>
        
        <div class="field">
          <span class="field-label">Email:</span>
          <div>${email}</div>
        </div>
        
        <div class="field">
          <span class="field-label">Phone:</span>
          <div>${phone || 'Not provided'}</div>
        </div>
        
        <div class="field">
          <span class="field-label">Subject:</span>
          <div>${subject || 'No Subject'}</div>
        </div>
        
        <div class="field">
          <span class="field-label">Message:</span>
          <div class="message">${message.replace(/\n/g, '<br>')}</div>
        </div>
        
        <div class="footer">
          <p>This email was sent from the contact form on Sri Sanari Infra website.</p>
          <p>© ${new Date().getFullYear()} Sri Sanari Infra. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `
  };
};
