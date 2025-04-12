import { code } from './prepareTestEnvironment'
import { createUser } from '../main'

describe('createUser function', () => {
  test('should return a User object with isActive defaulting to true when not provided', () => {
    const name = 'Марія'
    const age = 28

    const result = createUser(name, age)

    // Перевіряємо, що isActive за замовчуванням встановлено в true
    expect(result).toEqual({ name, age, isActive: true })
  })

  test('should return a User object with correct properties', () => {
    const name = 'Анна'
    const age = 25
    const isActive = true

    const result = createUser(name, age, isActive)

    // Перевіряємо, що результат є об'єктом з правильними властивостями
    expect(result).toEqual({ name, age, isActive })
  })

  test('should return a User object with isActive set to false', () => {
    const name = 'Олег'
    const age = 30
    const isActive = false // Передаємо false для isActive

    const result = createUser(name, age, isActive)

    // Перевіряємо, що результат містить isActive: false
    expect(result.isActive).toBe(false)
  })

  // Тест на перевірку типів властивостей об'єкта User
  test('should have properties of correct types', () => {
    const name = 'Іван'
    const age = 40
    const isActive = true

    const user = createUser(name, age, isActive)

    expect(typeof user.name).toBe('string')
    expect(typeof user.age).toBe('number')
    expect(typeof user.isActive).toBe('boolean')
  })

  test('Checks for the presence of User type with flexible field order and spacing', () => {
    const typeRegex =
      /type\s+User\s*=\s*\{\s*(name\s*:\s*string\s*age\s*:\s*number\s*isActive\s*:\s*boolean|name\s*:\s*string\s*isActive\s*:\s*boolean\s*age\s*:\s*number|age\s*:\s*number\s*name\s*:\s*string\s*isActive\s*:\s*boolean|age\s*:\s*number\s*isActive\s*:\s*boolean\s*name\s*:\s*string|isActive\s*:\s*boolean\s*name\s*:\s*string\s*age\s*:\s*number|isActive\s*:\s*boolean\s*age\s*:\s*number\s*name\s*:\s*string)\s*}/
    const match = typeRegex.test(code)
    if (!match) {
      throw new Error(
        `User type definition does not match the expected format. Please ensure it includes 'name: string', 'age: number', and 'isActive: boolean' with any order and spacing.`
      )
    }
  })

  test('Checks for the correct typing in function parameters', () => {
    const functionParamRegex =
      /function\s+createUser\(\s*name\s*:\s*string\s*,\s*age\s*:\s*number\s*,\s*isActive\s*:\s*boolean(\s*=\s*true)?\s*\)\s*:\s*User/
    const match = functionParamRegex.test(code)
    if (!match) {
      throw new Error(
        `Function 'createUser' parameters typing does not match the expected format. Expected parameters to be '(name: string, age: number, isActive: boolean = true): User'.`
      )
    }
  })
})
