import { myPow } from '../main.js'

describe('myPow function tests', () => {
  const myPrint = (a, b, res) => `${a}^${b}=${res}`

  test('myPow calculates power correctly and returns expected string for 3^4', () => {
    // Check if the myPow function calculates 3^4 correctly and returns the expected string
    expect(myPow(3, 4, myPrint)).toBe('3^4=81')
  })

  test('myPow calculates power correctly and returns expected string for 2^3', () => {
    // Check if the myPow function calculates 2^3 correctly and returns the expected string
    expect(myPow(2, 3, myPrint)).toBe('2^3=8')
  })

  test('myPow calculates power correctly and returns expected string for 5^0', () => {
    // Check if the myPow function calculates 5^0 correctly and returns the expected string
    // Since any number to the power of 0 is 1
    expect(myPow(5, 0, myPrint)).toBe('5^0=1')
  })

  test('myPow calculates power correctly and returns expected string for 2^1', () => {
    // Check if the myPow function calculates 2^1 correctly and returns the expected string
    // Since any number to the power of 1 is the number itself
    expect(myPow(2, 1, myPrint)).toBe('2^1=2')
  })

  test('myPow handles negative exponents correctly for 2^-2', () => {
    // This test is to check if the myPow function can handle negative exponents correctly
    expect(myPow(2, -2, myPrint)).toBe('2^-2=0.25')
  })
})
