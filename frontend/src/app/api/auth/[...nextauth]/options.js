import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { CredentialsProvider } from "next-auth/providers";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_SECRET,
    }),
    credentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: 1, name: "J Smith", email: "@jsmith" };
        if (
          credentials.username === user.name &&
          credentials.password === credentials.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
export default NextAuth(authOptions);
