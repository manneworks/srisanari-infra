'use server';

import { sendEmail } from "@/lib/email/service"
import { getPropertyInquiryTemplate } from "@/lib/email/templates/propertyInquiry"

export async function submitPropertyInquiry(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string
    const propertyId = formData.get('propertyId') as string
    const propertyTitle = formData.get('propertyTitle') as string

    // Basic validation
    if (!name || !email || !message) {
      return { success: false, message: 'Please fill in all required fields' }
    }

    // Email regex for basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Please enter a valid email address' }
    }

    // Get the email template
    const emailTemplate = getPropertyInquiryTemplate({
      name,
      email,
      phone: phone || '',
      message,
      subject: `Inquiry about ${propertyTitle || 'property'}`,
      propertyId,
      propertyTitle
    });
    
    // Set the reply-to header to the sender's email
    const replyTo = `${name} <${email}>`;

    // Send email
    await sendEmail({
      to: process.env.CONTACT_EMAIL || process.env.SMTP_TO || 'your-email@example.com',
      subject: emailTemplate.subject,
      text: emailTemplate.text,
      html: emailTemplate.html,
      replyTo
    });

    return { 
      success: true, 
      message: 'Your inquiry has been sent successfully! We will get back to you soon.' 
    };
  } catch (error) {
    console.error('Error submitting property inquiry:', error);
    return { 
      success: false, 
      message: 'Failed to send your inquiry. Please try again later or contact us directly.' 
    };
  }
}
