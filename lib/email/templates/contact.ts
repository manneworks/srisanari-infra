import { ContactFormData } from '../types';

export const getContactEmailTemplate = (data: ContactFormData) => {
  const { name, email, phone, subject, message } = data;
  
  // Format the current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return {
    subject: `New Contact Form: ${subject || 'Enquiry from Website'}`,
    text: `
      Contact Form Submission
      ======================
      
      Subject: ${subject || 'No Subject'}
      
      Contact Information:
      -------------------
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      
      Message:
      --------
      ${message}
      
      This inquiry was submitted on: ${currentDate}
    `,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form - SRI SANARI</title>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
      <style type="text/css">
        /* Base Styles */
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Montserrat', 'Open Sans', Arial, sans-serif;
          line-height: 1.6;
          color: #2D3748;
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: 100%;
          width: 100% !important;
          height: 100% !important;
          background: #f9fafb;
        }
        .email-container {
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          max-width: 600px;
          margin: 0 auto;
        }
        /* Header Styles */
        .email-header {
          background-color: #1a365d;
          color: #ffffff;
          padding: 30px 20px 25px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .logo-container {
          margin: 0 auto 15px;
          text-align: center;
          max-width: 300px;
        }
        .email-logo {
          max-width: 120px;
          height: auto;
          margin: 0 auto 10px;
          display: block;
        }
        .site-name {
          font-family: 'Montserrat', Arial, sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          margin: 15px 0 5px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .site-tagline {
          font-family: 'Open Sans', Arial, sans-serif;
          font-size: 14px;
          color: #e2e8f0;
          margin: 0;
          font-weight: 400;
          letter-spacing: 0.5px;
          line-height: 1.4;
        }
        .email-body {
          padding: 30px;
        }
        .section-title {
          color: #2c5282;
          font-size: 16px;
          font-weight: 600;
          margin: 25px 0 15px 0;
          padding-bottom: 8px;
          border-bottom: 2px solid #e2e8f0;
        }
        .detail-row {
          margin-bottom: 12px;
          display: flex;
          flex-wrap: wrap;
        }
        .detail-label {
          font-weight: 600;
          color: #4a5568;
          width: 100px;
          flex-shrink: 0;
        }
        .detail-value {
          color: #2d3748;
          flex: 1;
        }
        .message-box {
          background-color: #f8fafc;
          border-left: 4px solid #4299e1;
          padding: 15px;
          margin: 20px 0;
          border-radius: 0 4px 4px 0;
          line-height: 1.6;
        }
        .reply-button {
          display: inline-block;
          background-color: #ecc94b;
          color: #2d3748;
          text-decoration: none;
          font-weight: 600;
          padding: 10px 24px;
          border-radius: 4px;
          margin: 25px 0 15px;
          text-align: center;
          transition: all 0.3s ease;
          font-family: 'Montserrat', Arial, sans-serif;
          font-size: 15px;
        }
        .reply-button:hover {
          background-color: #d69e2e;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          font-size: 13px;
          color: #718096;
          text-align: center;
        }
        @media only screen and (max-width: 600px) {
          .email-body {
            padding: 20px 15px;
          }
          .detail-row {
            flex-direction: column;
          }
          .detail-label {
            width: 100%;
            margin-bottom: 2px;
          }
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
    <body>
      <div class="email-container">
        <!-- Email Header with Logo -->
        <div class="email-header">
          <div class="logo-container">
            <!-- Logo with fallback -->
            <img src="https://srisanari.com/images/logo-white.png" 
                 alt="SRI SANARI" 
                 class="email-logo" 
                 style="max-width: 120px; height: auto; border: 0; display: block; margin: 0 auto 15px;">
            
            <!-- Site Name with inline styles for email clients -->
            <div style="font-family: 'Montserrat', Arial, sans-serif; font-size: 24px; font-weight: 700; color: #ffffff; margin: 15px 0 5px; letter-spacing: 1px; text-transform: uppercase; line-height: 1.2;">
              SRI SANARI
            </div>
            
            <!-- Tagline with inline styles -->
            <div style="font-family: 'Open Sans', Arial, sans-serif; font-size: 14px; color: #e2e8f0; margin: 5px 0 0; font-weight: 400; letter-spacing: 0.5px; line-height: 1.4;">
              Building Dreams, Crafting Legacies
            </div>
          </div>
          
          <!-- Email Title -->
          <h1 style="margin: 25px 0 10px; font-size: 20px; font-weight: 600; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; padding: 0 10px;">
            New Contact Form Submission
          </h1>
          
          <!-- Date -->
          <p style="margin: 10px 0 0; font-size: 13px; color: #e2e8f0; opacity: 0.9; font-family: 'Open Sans', Arial, sans-serif;">
            ${currentDate}
          </p>
        </div>
        
        <div class="email-body">
          <h2 class="section-title">Contact Information</h2>
          
          <div class="detail-row">
            <div class="detail-label">Name:</div>
            <div class="detail-value">${name}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">Email:</div>
            <div class="detail-value"><a href="mailto:${email}" style="color: #2b6cb0; text-decoration: none;">${email}</a></div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">Phone:</div>
            <div class="detail-value">${phone || 'Not provided'}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">Subject:</div>
            <div class="detail-value">${subject || 'No Subject'}</div>
          </div>
          
          <h2 class="section-title">Message</h2>
          <div class="message-box">
            ${message.replace(/\n/g, '<br>')}
          </div>
          
          <!-- Reply Button -->
          <div style="text-align: center; margin: 25px 0;">
            <a href="mailto:${email}" class="reply-button" style="display: inline-block; background-color: #ecc94b; color: #2d3748; text-decoration: none; font-weight: 600; padding: 10px 24px; border-radius: 4px; margin: 25px 0 15px; text-align: center; font-family: 'Montserrat', Arial, sans-serif; font-size: 15px; transition: all 0.3s ease;">
              Reply to ${name.split(' ')[0]}
            </a>
          </div>
          
          <div class="footer">
            <p>This message was sent from the contact form on SRI SANARI website.</p>
            <p style="margin-top: 5px; font-size: 12px; color: #a0aec0;">
              &copy; ${new Date().getFullYear()} SRI SANARI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `
  };
};
