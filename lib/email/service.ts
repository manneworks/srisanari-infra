import nodemailer from 'nodemailer';
import { EmailOptions, EmailResponse } from './types';
import { getContactEmailTemplate } from './templates/contact';

// Check if SMTP configuration is available
const isSmtpConfigured = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM',
  'SMTP_TO'
].every(envVar => process.env[envVar]);

let transporter: nodemailer.Transporter | null = null;

if (isSmtpConfigured) {
  // Create reusable transporter object using the default SMTP transport
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    logger: process.env.NODE_ENV !== 'production',
    debug: process.env.NODE_ENV !== 'production',
  });

  // Verify connection configuration
  transporter.verify((error) => {
    if (error) {
      console.error('SMTP connection error:', error);
    } else {
      console.log('SMTP server is ready to take our messages');
    }
  });
} else {
  console.warn('SMTP configuration is incomplete. Emails will be logged to console instead.');
  
  // Create a test account for development
  if (process.env.NODE_ENV === 'development') {
    (async () => {
      try {
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
        console.log('Using Ethereal email for development. Check emails at: https://ethereal.email/');
      } catch (error) {
        console.error('Failed to create test email account:', error);
      }
    })();
  }
}

/**
 * Send an email using the configured SMTP server or log to console if not configured
 */
export const sendEmail = async (options: EmailOptions): Promise<EmailResponse> => {
  try {
    const from = `"Sri Sanari Infra" <${process.env.SMTP_FROM || 'noreply@srisanari.in'}>`;
    const to = process.env.SMTP_TO || 'contact@srisanari.in';
    
    const mailOptions = {
      from,
      to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.subject,
    };

    if (!transporter) {
      // If no transporter is available (missing SMTP config), log the email to console
      console.log('\n--- Email Not Sent (SMTP not configured) ---');
      console.log('From:', from);
      console.log('To:', to);
      console.log('Subject:', options.subject);
      console.log('\nHTML Content:');
      console.log('----------------------------------------');
      console.log(options.html);
      console.log('----------------------------------------\n');
      
      return {
        success: true,
        message: 'Email logged to console (SMTP not configured)',
        messageId: `local-${Date.now()}`,
      };
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    
    // Only log preview URL for Ethereal email
    if (process.env.NODE_ENV === 'development' && info.response.includes('ethereal.email')) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return {
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
};

/**
 * Send a contact form email
 */
export const sendContactEmail = async (formData: any): Promise<EmailResponse> => {
  try {
    const { subject, text, html } = getContactEmailTemplate(formData);
    
    return sendEmail({
      to: process.env.SMTP_TO!,
      subject,
      text,
      html,
      replyTo: `"${formData.name}" <${formData.email}>`,
    });
  } catch (error) {
    console.error('Error in sendContactEmail:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to prepare email',
    };
  }
};

export default {
  sendEmail,
  sendContactEmail,
};
