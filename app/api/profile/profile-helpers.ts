import { prisma } from '@/lib/prisma'
import _ from 'lodash'
import { ProfilePayload } from '@/common/backend-types'
import { Gender } from '@prisma/client'

export async function upsertProfile({ userId, gender, bodyWeight, age }: ProfilePayload) {
  return prisma.$transaction(async (tx) => {
    const user = await prisma.user.findFirst({
      where: { id: userId }
    })
    const userProfileId = _.get(user, 'profileId')

    const payload = {
      gender: _.upperCase(gender) as Gender,
      bodyWeight,
      age
    }

    // if a user profile does not exist, create one
    if (_.isNull(userProfileId) || _.isUndefined(userProfileId)) {
      const newProfile = await tx.profile.create({
        data: payload
      })

      return tx.user.update({
        where: { id: userId },
        data: { profileId: newProfile.id }
      })
    }

    const profile = await tx.profile.findFirst({
      where: { id: userProfileId }
    })

    if (!profile) {
      console.log(`Create Profile Error: profile not found for user ${JSON.stringify(user)}`)
      return
    }

    // if a user profile does exist, update the record
    return tx.profile.update({
      where: { id: profile.id },
      data: payload
    })
  })
}