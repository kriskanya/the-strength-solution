import { Prisma } from '@prisma/client'
import TransactionClient = Prisma.TransactionClient

export async function updateUser(tx: TransactionClient, { id, email, firstName, lastName }: UpdateUserPayload) {
  return tx.user.update({
    where: { id },
    data: { email, firstName, lastName }
  })
}

export interface UpdateUserPayload {
  id        : string,
  email     : string,
  firstName : string,
  lastName  : string
}