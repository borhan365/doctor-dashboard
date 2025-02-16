import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient, Role, Status } from "@prisma/client";
import axios from "axios";
import bcrypt from "bcryptjs"; // Change this line
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

interface SignUpData {
  name: string;
  email: string;
  password: string;
  role: Role;
  status: Status;
  bio: string;
  slug: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as Role;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export function isPublicRoute(req: Request) {
  const publicRoutes = [
    '/api/testimonials',
    '/api/testimonials/'
  ];
  
  const { pathname } = new URL(req.url);
  return (
    publicRoutes.includes(pathname) && 
    req.method === 'GET'
  );
}

export async function signUp(data: SignUpData) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        status: data.status,
        bio: data.bio,
        slug: data.slug,
      },
    });

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during sign up");
  }
}

export async function signIn(email: string, password: string) {
  try {
    const response = await axios.post("/api/auth/signin", { email, password });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "An error occurred during sign in",
      );
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function signOut() {
  try {
    const response = await axios.post("/api/auth/signout");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "An error occurred during sign out",
      );
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
}

export async function getCurrentUser() {
  try {
    const response = await axios.get("/api/auth/user");
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      // User is not authenticated
      return null;
    }
    throw error;
  }
}
