import NextAuth from "next-auth";
import Adapters from "next-auth/adapters";
import Providers from "next-auth/providers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // server: {
      //   host: process.env.EMAIL_SERVER_HOST,
      //   port: process.env.EMAIL_SERVER_PORT,
      //   auth: {
      //     user: process.env.EMAIL_SERVER_USER,
      //     pass: process.env.EMAIL_SERVER_PASSWORD
      //   }
      // },
      // from: process.env.EMAIL_FROM
    }),
  ],
  database: process.env.DATABASE_URL,
  adapter: Adapters.Prisma.Adapter({
    prisma,
    modelMapping: {
      User: "user",
      Account: "account",
      Session: "session",
      VerificationRequest: "verificationRequest",
    },
  }),
  callbacks: {
    redirect: async (url, baseUrl) => {
      console.log(url, baseUrl, "url and baseUrl")
      return Promise.resolve(url)
    },
    session: async (session, user) => Promise.resolve({ ...session, id: user.id }),
  }
});
