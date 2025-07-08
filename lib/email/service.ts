import nodemailer from 'nodemailer';
import { EmailOptions, EmailResponse } from './types';
import { getContactEmailTemplate } from './templates/contact';

// Validate required environment variables
const requiredEnvVars = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM',
  'SMTP_TO'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  logger: process.env.NODE_ENV !== 'production', // Log only in development
  debug: process.env.NODE_ENV !== 'production', // Debug only in development
});

// Verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});

/**
 * Send an email using the configured SMTP server
 */
export const sendEmail = async (options: EmailOptions): Promise<EmailResponse> => {
  try {
    const mailOptions = {
      from: `"Sri Sanari Infra" <${process.env.SMTP_FROM}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      replyTo: options.replyTo,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent:', {
      messageId: info.messageId,
      to: options.to,
      subject: options.subject,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      to: options.to,
      subject: options.subject,
      timestamp: new Date().toISOString(),
    });

    return {
      success: false,
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
