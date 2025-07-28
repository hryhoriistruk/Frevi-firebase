import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Email',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        })
                    });

                    const data = await response.json();

                    if (data.user) {
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.name,
                            token: data.token
                        };
                    }
                    return null;
                } catch (error) {
                    throw new Error('Invalid email or password');
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.accessToken = token.accessToken;
            return session;
        }
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/login'
    },
    secret: process.env.NEXTAUTH_SECRET
});

export const config = {
    api: {
        runtime: 'nodejs',
        bodyParser: {
            sizeLimit: '10mb'
        }
    }
};