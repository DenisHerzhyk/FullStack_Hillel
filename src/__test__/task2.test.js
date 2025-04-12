import { UniqueUsernames } from '../main'
import { code } from './prepareTestEnvironment'

describe('Code tests for UniqueUsernames', () => {
  let usernames

  beforeEach(() => {
    usernames = new UniqueUsernames()
  })

  test('Adds unique usernames', () => {
    usernames.addUser('john_doe')
    expect(usernames.count()).toBe(1)
    usernames.addUser('jane_doe')
    expect(usernames.count()).toBe(2)
  })

  test('Ignores duplicate usernames', () => {
    usernames.addUser('john_doe')
    usernames.addUser('john_doe')
    expect(usernames.count()).toBe(1)
  })

  test('Checks if a username exists', () => {
    usernames.addUser('jane_doe')
    expect(usernames.exists('jane_doe')).toBeTruthy()
    expect(usernames.exists('john_doe')).toBeFalsy()
  })

  test('Class should be defined with "class" keyword', () => {
    expect(code.includes('class UniqueUsernames')).toBeTruthy()
  })

  test('Class should instantiate a new Set', () => {
    const classCodeAsString = UniqueUsernames.toString()
    expect(classCodeAsString.includes('new Set')).toBeTruthy()
  })
})
