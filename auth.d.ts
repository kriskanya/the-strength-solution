import "next-auth";
import { Profile, User } from '@prisma/client'

type SafeUserData = Omit<User, 'password' | 'google' | 'facebook'> & {
  profile: Profile | null
  hasPassword: boolean
}

declare module "next-auth" {
  interface Session {
    expires: string,
    user: User,
    userData?: SafeUserData
  }
}
