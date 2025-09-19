import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { getFrontendUrl } from '../utils/config';

// Ensure dotenv is loaded
dotenv.config();

// Debug: Check if env vars are loaded
console.log('Email config debug:', {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  nodeEnv: process.env.NODE_ENV,
  allEmailVars: Object.keys(process.env).filter(key => key.includes('EMAIL'))
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password for Gmail
  },
});

export async function sendMagicLink(email: string, token: string): Promise<boolean> {
  try {
    const baseUrl = getFrontendUrl();
    const magicLink = `${baseUrl}/auth/verify?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Sign in to FlyFim',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Sign in to FlyFim</h2>
          <p>Click the button below to sign in to your account:</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${magicLink}"
               style="background-color: #007bff; color: white; padding: 12px 24px;
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Sign In
            </a>
          </div>

          <p style="color: #666; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:
          </p>
          <p style="color: #007bff; word-break: break-all; font-size: 14px;">
            ${magicLink}
          </p>

          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            This link will expire in 15 minutes. If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Failed to send magic link email:', error);
    return false;
  }
}

export async function verifyEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email service connection failed:', error);
    return false;
  }
}