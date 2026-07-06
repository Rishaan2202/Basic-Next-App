// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "placeholder",
      clientSecret: process.env.GITHUB_SECRET || "placeholder",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "a-dummy-secret-at-least-32-characters-long",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };