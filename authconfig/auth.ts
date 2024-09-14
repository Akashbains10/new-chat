import User from "@/models/user.model";
import db from "@/utils/connectDB";
import bcrypt from 'bcryptjs';
import { getServerSession, NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const days = (i: number) => i * 24 * 60 * 60;
export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: days(1),
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && account.type === "credentials") {
                token.userId = account.providerAccountId; // this is Id that coming from authorize() callback
            }
            if (token) {
                const user = await User.findById(token.sub);
                if (user) token.role = user.role;
            }
            return token;
        },
        async session({ session, token, user }) {
            await db.connectDB();
            const findUser = await User.findById(token.userId);
            session = findUser;
            return session;
        }
    },
    pages: {
        signIn: "/auth/login"
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await db.connectDB();
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const findUser = await User.findOne({ email: email })
                if (!findUser) {
                    throw new Error('User not found')
                }
                if (!(await bcrypt.compare(password, findUser.password))) {
                    throw new Error('Invalid credentials')
                }
                return findUser;
            }
        })
    ]
};

export const getServerAuthSession = () => getServerSession(authOptions); //(6)
