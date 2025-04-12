import { counter } from '../main.js'

describe('Counter Functionality Tests', () => {
  test('counter initializes and returns 0 when set to 0', () => {
    // Test if the counter function correctly initializes the count to 0 and returns it
    expect(counter(0)).toBe(0)
  })

  test('counter increments correctly after being reset to 0', () => {
    // Reset the counter to 0, then increment twice to test if it returns the expected value
    counter(0) // reset
    counter() // increment to 1
    expect(counter()).toBe(2) // check if the counter increments to 2
  })

  test('counter handles sequential increments and resets correctly', () => {
    // This tests a series of resets and increments to check if the counter maintains state correctly
    expect(counter(100)).toBe(100) // reset to 100, expect 100
    expect(counter()).toBe(101) // expect 101 after increment
    expect(counter()).toBe(102) // expect 102 after increment
    expect(counter(500)).toBe(500) // reset to 500, expect 500
    expect(counter()).toBe(501) // expect 501 after increment
    expect(counter()).toBe(502) // expect 502 after increment
    expect(counter(9900)).toBe(9900) // reset to 9900, expect 9900
    expect(counter()).toBe(9901) // expect 9901 after increment
    expect(counter()).toBe(9902) // expect 9902 after increment
    expect(counter()).toBe(9903) // expect 9903 after increment
  })

  test('counter increments correctly after multiple calls', () => {
    // Test if the counter correctly increments after being reset and then called multiple times
    counter(0) // reset to 0
    counter() // increment to 1
    counter() // increment to 2
    expect(counter()).toBe(3) // expect 3 on the third increment
    expect(counter()).toBe(4) // expect 4 on the fourth increment
    expect(counter()).toBe(5) // expect 5 on the fifth increment
  })
})
