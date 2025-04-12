import { myMax } from '../main.js'

describe('Function myMax tests', () => {
  test('myMax returns the maximum value from an array', () => {
    const list = [12, 23, 100, 34, 56, 9, 233]
    expect(myMax(list)).toBe(233)
  })

  test('myMax works with negative numbers', () => {
    const list = [-12, -23, -100, -34, -56, -9, -233]
    expect(myMax(list)).toBe(-9)
  })

  test('myMax returns -Infinity for an empty array', () => {
    const list = []
    expect(myMax(list)).toBe(-Infinity)
  })

  test('Function contains Math.max and apply usage', () => {
    const myMaxStr = myMax.toString()
    expect(myMaxStr).toMatch(/Math.max/)
    expect(myMaxStr).toMatch(/apply/)
  })
})
