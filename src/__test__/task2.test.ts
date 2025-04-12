import { Calculator } from '../main'
import { code } from './prepareTestEnvironment'

describe('Calculator with LogMethodCalls decorator', () => {
  let calculator: Calculator
  let logSpy: jest.SpyInstance

  beforeEach(() => {
    calculator = new Calculator()
    logSpy = jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    logSpy.mockRestore()
  })

  test('add correctly adds two numbers', () => {
    expect(calculator.add(2, 3)).toBe(5)
  })

  test('multiply correctly multiplies two numbers', () => {
    expect(calculator.multiply(2, 4)).toBe(8)
  })

  test('add logs method call', () => {
    calculator.add(5, 3)
    expect(logSpy).toHaveBeenCalledWith('Calling "add" with arguments: 5, 3')
  })

  test('multiply logs method call', () => {
    calculator.multiply(4, 2)
    expect(logSpy).toHaveBeenCalledWith('Calling "multiply" with arguments: 4, 2')
  })

  test('contains LogMethodCalls decorator on methods', () => {
    const decoratorRegex = /@LogMethodCalls\s*\n\s*(\w+)\(.*\):/g
    const matches = Array.from(code.matchAll(decoratorRegex))

    expect(matches.length).toBeGreaterThanOrEqual(2) // Expecting at least 2 occurrences for add and multiply methods
    expect(matches[0][1]).toBe('add') // First match should be the add method
    expect(matches[1][1]).toBe('multiply') // Second match should be the multiply method
  })
})
