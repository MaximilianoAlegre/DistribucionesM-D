import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/libs/db.users';
import bcrypt from 'bcrypt';

// Definir los tipos necesarios para las credenciales y el usuario
interface Credentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  password: string; // Esto es temporal para la comparación con bcrypt
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password', placeholder: '*****' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials as Credentials;

        const userFound: User | null = await db.users.findUnique({
          where: {
            email: email,
          },
        });

        if (!userFound) {
          return null;
        }

        const matchPassword: boolean = await bcrypt.compare(password, userFound.password);

        if (!matchPassword) {
          return null;
        }

        return {
          id: userFound.id.toString(),  // Convertimos a string para que coincida con el tipo `User`
          name: userFound.username,
          email: userFound.email,
        } as any;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
};

// Necesitas importar el método de manejo de la siguiente manera
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
