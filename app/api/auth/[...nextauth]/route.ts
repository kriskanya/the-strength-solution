import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '@prisma/client'

/* In order to pass some data through, we have to return it from authorize(),
* pass it through the jwt function, and then use it in the session */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/log-in'
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        console.log('authorize', credentials)

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        console.log('password is valid', isPasswordValid)

        if (!isPasswordValid) {
          return null
        }


        return {
          id: user.id + '',
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${ user.firstName } ${ user.lastName }`
        }
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id
        }
      }
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user })
      if (user) {
        const u = user as unknown as User
        return {
          ...token,
          id: u.id
        }
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }