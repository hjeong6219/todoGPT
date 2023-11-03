import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
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
export default NextAuth(options);
