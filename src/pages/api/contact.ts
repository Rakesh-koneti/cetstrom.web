import { NextApiRequest, NextApiResponse } from 'next';
import { sendContactEmail } from '../../api/contact';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, and message are required' 
      });
    }

    // Send the email
    const result = await sendContactEmail({ name, email, subject, message });

    if (result.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ 
        success: false, 
        error: result.error || 'Failed to send email' 
      });
    }
  } catch (error) {
    console.error('Error in contact API:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'An unexpected error occurred' 
    });
  }
} 