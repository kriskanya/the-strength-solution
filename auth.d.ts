import "next-auth";
import { Profile, User } from '@prisma/client'

declare module "next-auth" {
  interface Session {
    expires: string,
    user: User,
    userData: User & { profile: Profile }
  }
}