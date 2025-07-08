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
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 0;
          background-color: #f5f5f5;
        }
        .container {
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header { 
          background-color: #1a365d;
          color: white; 
          padding: 25px 20px; 
          text-align: center; 
        }
        .header h2 {
          font-family: 'Montserrat', Arial, sans-serif;
          font-weight: 600;
          margin: 0;
          font-size: 24px;
          color: #ffffff;
        }
        .content { 
          padding: 30px; 
          background-color: #ffffff;
        }
        .field { 
          margin-bottom: 20px;
          font-size: 15px;
        }
        .field-label { 
          font-weight: 600; 
          color: #4a5568;
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
        }
        .field-value {
          color: #2d3748;
          padding: 8px 0;
          font-size: 15px;
        }
        .message { 
          background-color: #f7fafc;
          padding: 15px; 
          border-radius: 4px; 
          margin-top: 5px; 
          white-space: pre-line;
          border-left: 3px solid #4299e1;
          font-size: 15px;
          line-height: 1.5;
        }
        .footer { 
          margin-top: 30px; 
          font-size: 12px; 
          color: #718096; 
          text-align: center; 
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }
      </style>
    </head>
    <body style="margin: 0; padding: 20px;">
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        
        <div class="content">
          <div class="field">
            <span class="field-label">Name</span>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <span class="field-label">Email</span>
            <div class="field-value">${email}</div>
          </div>
          
          ${phone ? `
          <div class="field">
            <span class="field-label">Phone</span>
            <div class="field-value">${phone}</div>
          </div>
          ` : ''}
          
          ${subject ? `
          <div class="field">
            <span class="field-label">Subject</span>
            <div class="field-value">${subject}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <span class="field-label">Message</span>
            <div class="message">${message.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="footer">
            <p>This email was sent from the contact form on Sri Sanari Infra website.</p>
            <p>© ${new Date().getFullYear()} Sri Sanari Infra. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `
  };
};
