import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import * as bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  callbacks: {
    session: async ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "User Name",
          type: "text",
          placeholder: "Your User Name",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });
        if (!user) throw new Error("User name and password is not correct.");

        if (!credentials?.password)
          throw new Error("Please Provide Your Password.");
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect)
          throw new Error("User name and password is not correct.");

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
