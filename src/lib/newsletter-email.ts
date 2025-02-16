import { sendEmail } from './email';

export async function sendConfirmationEmail(email: string, token: string) {
  const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletters/confirm?token=${token}`;
  
  await sendEmail({
    to: email,
    subject: 'Confirm your newsletter subscription',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e3a8a;">Confirm your subscription</h1>
        <p>Thank you for subscribing to our newsletter!</p>
        <p>Please click the button below to confirm your subscription:</p>
        
        <a href="${confirmUrl}" 
           style="display: inline-block;
                  background-color: #2563eb;
                  color: white;
                  padding: 12px 24px;
                  text-decoration: none;
                  border-radius: 6px;
                  margin: 20px 0;">
          Confirm Subscription
        </a>
        
        <p style="color: #64748b; font-size: 14px;">
          Or copy and paste this link in your browser:<br>
          <a href="${confirmUrl}" style="color: #2563eb;">${confirmUrl}</a>
        </p>
        
        <p style="color: #64748b; font-size: 14px;">
          This link will expire in 24 hours.
        </p>
        
        <hr style="border: 1px solid #e2e8f0; margin: 24px 0;">
        
        <p style="color: #64748b; font-size: 12px;">
          If you didn't request this subscription, you can safely ignore this email.
        </p>
      </div>
    `
  });
}

export async function sendUnsubscribeConfirmation(email: string) {
  await sendEmail({
    to: email,
    subject: 'Newsletter Unsubscription Confirmed',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e3a8a;">Unsubscription Confirmed</h1>
        <p>You have been successfully unsubscribed from our newsletter.</p>
        <p>We're sorry to see you go. If you'd like to resubscribe in the future, you can always visit our website.</p>
        
        <hr style="border: 1px solid #e2e8f0; margin: 24px 0;">
        
        <p style="color: #64748b; font-size: 12px;">
          This is an automated message, please do not reply to this email.
        </p>
      </div>
    `
  });
}

export async function sendPreferencesUpdateConfirmation(email: string, preferences: any) {
  await sendEmail({
    to: email,
    subject: 'Newsletter Preferences Updated',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e3a8a;">Preferences Updated</h1>
        <p>Your newsletter preferences have been successfully updated.</p>
        
        <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; margin: 20px 0;">
          <h2 style="color: #1e3a8a; font-size: 18px;">Your current preferences:</h2>
          <ul>
            ${Object.entries(preferences).map(([key, value]) => `
              <li style="color: #64748b;">${key}: ${value}</li>
            `).join('')}
          </ul>
        </div>
        
        <p>You can update these preferences at any time by visiting your account settings.</p>
        
        <hr style="border: 1px solid #e2e8f0; margin: 24px 0;">
        
        <p style="color: #64748b; font-size: 12px;">
          This is an automated message, please do not reply to this email.
        </p>
      </div>
    `
  });
} 