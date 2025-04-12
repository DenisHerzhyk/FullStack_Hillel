import { code } from './prepareTestEnvironment'
import { createPerson } from '../main'

describe('createPerson function', () => {
  test('should return a Person object with correct properties', () => {
    const name = 'Анна'
    const age = 25
    const isActive = true

    const result = createPerson(name, age, isActive)

    // Перевіряємо, що результат є об'єктом з правильними властивостями
    expect(result).toEqual({ name, age, isActive })
  })

  test('should return a Person object with isActive set to false', () => {
    const name = 'Олег'
    const age = 30
    const isActive = false // Передаємо false для isActive

    const result = createPerson(name, age, isActive)

    // Перевіряємо, що результат містить isActive: false
    expect(result.isActive).toBe(false)
  })

  // Тест на перевірку типів властивостей об'єкта Person
  test('should have properties of correct types', () => {
    const name = 'Іван'
    const age = 40
    const isActive = true

    const person = createPerson(name, age, isActive)

    expect(typeof person.name).toBe('string')
    expect(typeof person.age).toBe('number')
    expect(typeof person.isActive).toBe('boolean')
  })

  test('Checks for the presence of PersonInterface with flexible field order and spacing', () => {
    const interfaceRegex =
      /interface\s+PersonInterface\s*\{\s*(name\s*:\s*string\s*;?\s*age\s*:\s*number\s*;?\s*isActive\s*:\s*boolean\s*;?|name\s*:\s*string\s*;?\s*isActive\s*:\s*boolean\s*;?\s*age\s*:\s*number\s*;?|age\s*:\s*number\s*;?\s*name\s*:\s*string\s*;?\s*isActive\s*:\s*boolean\s*;?|age\s*:\s*number\s*;?\s*isActive\s*:\s*boolean\s*;?\s*name\s*:\s*string\s*;?|isActive\s*:\s*boolean\s*;?\s*name\s*:\s*string\s*;?\s*age\s*:\s*number\s*;?|isActive\s*:\s*boolean\s*;?\s*age\s*:\s*number\s*;?\s*name\s*:\s*string\s*;?)\s*}/
    const match = interfaceRegex.test(code)
    if (!match) {
      throw new Error(
        `PersonInterface definition does not match the expected format. Please ensure it includes 'name: string', 'age: number', and 'isActive: boolean' with any order and spacing.`
      )
    }
  })

  test('Checks for the correct typing in function parameters', () => {
    const functionParamRegex =
      /function\s+createPerson\(\s*name\s*:\s*string,\s*age\s*:\s*number,\s*isActive\s*:\s*boolean\s*\)\s*:\s*PersonInterface/
    const match = functionParamRegex.test(code)
    if (!match) {
      throw new Error(
        `Function 'createPerson' parameters typing does not match the expected format. Expected parameters to be '(name: string, age: number, isActive: boolean): PersonInterface'.`
      )
    }
  })
})
