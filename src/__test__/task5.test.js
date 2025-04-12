import { myDouble, myMul, myTriple } from '../main'
import { code } from './prepareTestEnvironment'

describe('Multiplication functions tests', () => {
  test('myMul correctly multiplies two numbers', () => {
    expect(myMul(2, 3)).toBe(6)
    expect(myMul(4, 5)).toBe(20)
  })

  test('myDouble correctly doubles the number', () => {
    expect(myDouble(3)).toBe(6)
    expect(myDouble(4)).toBe(8)
    expect(myDouble(5)).toBe(10)
  })

  test('myTriple correctly triples the number', () => {
    expect(myTriple(3)).toBe(9)
    expect(myTriple(4)).toBe(12)
    expect(myTriple(5)).toBe(15)
  })

  test('myDouble and myTriple are created using myMul.bind', () => {
    expect(code).toMatch(/myMul.bind/)
  })
})
