import { code } from './prepareTestEnvironment'
import { sumArray } from '../main'

describe('sumArray', () => {
  const functionRegex =
    /function sumArray\(numbers: number\[\]\): number \{[\s\S]*?\}|const sumArray = \(numbers: number\[\]\): number => \{[\s\S]*?\}|let sumArray = \(numbers: number\[\]\): number => \{[\s\S]*?\}|var sumArray = \(numbers: number\[\]\): number => \{[\s\S]*?\}/
  const match = code.match(functionRegex)
  const sumArrayCode = match ? match[0] : 'Функція не знайдена.'

  test('returns the sum of all numbers in the array', () => {
    expect(sumArray([1, 2, 3, 4])).toBe(10)
  })

  test('uses correct typing for parameters and return type', () => {
    const regex = /\(numbers: (number\[\]|Array<number>)\): number/
    if (!regex.test(sumArrayCode)) {
      throw new Error("The 'sumArray' function does not use the correct typing for parameters and return type.")
    }
  })

  test('uses correct typing for return type', () => {
    const regexReturn = /:\s*number/ // Allows optional space between ':' and 'number'
    if (!regexReturn.test(sumArrayCode)) {
      throw new Error("The 'sumArray' function does not correctly specify the return type as 'number'.")
    }
  })

  if (!sumArrayCode) {
    throw new Error("The 'sumArray' function code could not be found in the provided code.")
  }
})
