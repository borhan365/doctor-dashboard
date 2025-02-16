import { useSession } from 'next-auth/react';
import { Role, Status } from '@prisma/client';

interface User {
  id: string;
  role: Role;
  status: Status;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  emailVerified?: Date | null;
}

interface EmailVerificationGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const EmailVerificationGuard = ({ 
  children, 
  fallback 
}: EmailVerificationGuardProps) => {
  const { data: session } = useSession();
  const user = session?.user as User;
  
  if (!user?.emailVerified) {
    return fallback || (
      <div className="rounded-lg bg-yellow-50 p-4">
        <p className="text-sm text-yellow-700">
          Please verify your email address to access this feature.
        </p>
      </div>
    );
  }
  
  return <>{children}</>;
}; 