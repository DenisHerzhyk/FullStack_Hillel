import { CalorieCalculator } from '../main.js'
import { code } from './prepareTestEnvironment'

describe('Code tests for CalorieCalculator', () => {
  let calculator

  beforeEach(() => {
    calculator = new CalorieCalculator()
  })

  test('Adds and retrieves a product', () => {
    calculator.addProduct('Apple', 52)
    expect(calculator.getProductCalories('Apple')).toBe(52)
  })

  test('Returns "Product not found" for non-existent product', () => {
    expect(calculator.getProductCalories('Orange')).toBe('Product not found')
  })

  test('Removes a product', () => {
    calculator.addProduct('Banana', 89)
    calculator.removeProduct('Banana')
    expect(calculator.getProductCalories('Banana')).toBe('Product not found')
  })

  test('Class should be defined with "class" keyword', () => {
    expect(code.includes('class CalorieCalculator')).toBeTruthy()
  })

  test('Class should instantiate a new Map', () => {
    const classAsString = CalorieCalculator.toString()
    expect(classAsString).toMatch(/new\s+Map\(\)/)
  })
})
