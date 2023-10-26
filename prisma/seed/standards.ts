const _ = require('lodash')
import * as fs from 'fs'
import { ExerciseName, Gender, Level } from '@prisma/client'

// interface StrengthStandard {
//   weight: number,
//   reps: number,
//   level: Level,
//   age: number,
//   gender: Gender,
//   exercise: ExerciseName
// }

// function addAgeToFileContents(fileContents: StrengthStandard[], ages: number[]) {
//   return ages.map(age => {
//     const strengthStandards = _.cloneDeep(fileContents)
//     return strengthStandards.map((standard: StrengthStandard) => {
//       standard.age = age
//       return standard
//     })
//   })
// }

export function standardSeedValues() {
  // return fs.readdirSync(`${__dirname}/dips`)
  //   .map(fileName => {
  //     // grab content between brackets in filename; e.g., dips-male[18-23].ts => ['18-23']
  //     const match = fileName.match(/(?<=\[).+?(?=\])/g)
  //
  //     if (_.isNull(match) || _.isUndefined(match) || !match) return
  //
  //     const ageRange: string | undefined = match[0]
  //     const [lowerAgeRange, higherAgeRange] = (ageRange as string).split('-')
  //     const ages = Array.from({length: (+higherAgeRange - +lowerAgeRange) + 1}, (_, i) => i + +lowerAgeRange)
  //     return { fileContents: require(`${__dirname}/dips/${fileName}`), ages }
  //   })
  //   .map(res => {
  //     const values: any = Object.values(res?.fileContents).flat()
  //     return addAgeToFileContents(values, res?.ages as number[])
  //   })
  //   .flat(2)

  console.log(require(`${__dirname}/back-extensions/back-extensions-female[14-17].ts`))
  const fileContents = require(`${__dirname}/back-extensions/back-extensions-female[14-17].ts`)
  debugger

  return Object.values(fileContents).flat() as any
}


