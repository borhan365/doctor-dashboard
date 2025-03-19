import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    doctorId?: string;
    image?: string | null;
    accessToken: string;
  }

  interface Session {
    user: User & {
      id: string;
      role: string;
      doctorId?: string;
      accessToken: string;
    };
  }
}
