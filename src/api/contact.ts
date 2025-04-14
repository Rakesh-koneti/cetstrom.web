import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cetstrom.in@gmail.com',
    // This should be an app password, not your regular Gmail password
    // You'll need to generate this in your Google Account settings
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { name, email, subject, message } = formData;

  const mailOptions = {
    from: 'cetstrom.in@gmail.com',
    to: 'cetstrom.in@gmail.com',
    subject: `Contact Form: ${subject || 'New Message'}`,
    text: `
Name: ${name}
Email: ${email}
Subject: ${subject || 'No subject provided'}

Message:
${message}
    `,
    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #ea580c;">New Contact Form Submission</h2>
  <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject || 'No subject provided'}</p>
    <div style="margin-top: 20px;">
      <strong>Message:</strong>
      <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; white-space: pre-wrap;">
        ${message.replace(/\n/g, '<br>')}
      </div>
    </div>
  </div>
  <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
    This message was sent from the contact form on CETSTROM.in
  </p>
</div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
} 