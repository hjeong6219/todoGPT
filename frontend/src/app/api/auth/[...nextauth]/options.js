import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const options = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackUrl: process.env.GITHUB_CALLBACK_URL,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(
            "https://todogpt-backend.vercel.app/users/login",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );
          if (data.userExists) {
            return { id: data.userExists._id, email: data.userExists.email };
          } else {
            throw new Error("User does not exist or password is incorrect");
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
      callbacks: {
        async jwt(token, user) {
          if (user) {
            token.id = user._id;
          }
          return token;
        },
        async session(session, token) {
          if (token.id) {
            session.user.id = token.id;
          }
          return session;
        },
        async redirect({ url, baseUrl }) {
          return new URL(url).origin === new URL(baseUrl).origin
            ? url
            : baseUrl;
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
    // newUser: null,
  },
};
export default NextAuth(options);
