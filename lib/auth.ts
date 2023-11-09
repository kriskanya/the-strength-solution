import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'
import { isString } from 'lodash-es'
import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { Prisma, User } from '@prisma/client'
import _ from 'lodash'
import InputJsonValue = Prisma.InputJsonValue

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET


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
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: FACEBOOK_CLIENT_ID as string,
      clientSecret: FACEBOOK_CLIENT_SECRET as string,
    }),
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
          user.password as string
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
    session: async ({ session, token }) => {
      // console.log('Session Callback', { session, token })
      const email = _.get(session, 'user.email')
      let userData

      if (_.isString(email) && email.length) {
        userData = await prisma.user.findUnique({ where: { email } })
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id
        },
        userData
      }
    },
    jwt: async ({ token, user , account }) => {
      // console.log('JWT Callback', { token, user })

      if (user) {
        const u = user as unknown as User
        const fullName = _.get(user, 'name', '')
        const imageUrl = _.get(user, 'image', '')
        let firstName = '', lastName = ''
        if (user.name) {
          const splitFullName = user.name.split(' ')
          firstName = _.get(splitFullName, '[0]', '')
          lastName = _.get(splitFullName, '[1]', '')
        }

        if (user.email) {
          await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
              email: user.email,
              firstName,
              lastName,
              fullName,
              imageUrl
            }
          })

          if (!_.isEmpty(account) && ['google', 'facebook'].includes(account?.provider)) {
            await prisma.user.update({
              where: { email: user.email },
              data: { [account.provider]: account as InputJsonValue }
            })
          }
        }
        return {
          ...token,
          id: u.id,
          anotherProp: 'hello'
        }
      }

      return token
    },
    async signIn({ account, profile }) {
      if (account?.provider === 'credentials') return true
      if (!profile?.email) {
        throw new Error('No profile')
      }

      const splitName = isString(profile.name) && profile.name.length
        ? profile.name.split(' ')
        : ''
      const firstName = splitName[0].trim()
      const lastName = splitName[1].trim()

      await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email,
          firstName,
          lastName,
          fullName: profile.name
        },
        update: {
          firstName,
          lastName,
          fullName: profile.name
        },
      })
      return true
    }
  }
}