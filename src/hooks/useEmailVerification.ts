import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const useEmailVerification = (email: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const sendVerificationEmail = async (redirectUrl?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          redirectUrl: redirectUrl || window.location.href 
        }),
      });

      if (!response.ok) throw new Error('Failed to send verification email');

      toast.success('Verification email sent! Please check your inbox.');
      
      router.push(
        `/auth/verify-email?email=${encodeURIComponent(email)}${
          redirectUrl ? `&redirect=${encodeURIComponent(redirectUrl)}` : ''
        }`
      );
    } catch (error) {
      console.error('Error sending verification email:', error);
      toast.error('Failed to send verification email');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendVerificationEmail,
    isLoading,
  };
}; 