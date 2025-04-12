import { counterFactory } from '../main.js'

describe('counterFactory functionality tests', () => {
  beforeEach(() => {
    // Reset counter to its initial value before each test
    counterFactory.value(0)
  })

  test('Initial value of counter should be 0', () => {
    expect(counterFactory.value()).toBe(0)
  })

  test('Increment method should increase counter value by 1', () => {
    counterFactory.increment()
    expect(counterFactory.value()).toBe(1)
  })

  test('Decrement method should decrease counter value by 1', () => {
    counterFactory.increment() // Increment first to avoid negative values
    counterFactory.decrement()
    expect(counterFactory.value()).toBe(0)
  })

  test('Value method should set counter to a new value', () => {
    counterFactory.value(10)
    expect(counterFactory.value()).toBe(10)
  })

  test('Counter should increment correctly from a new value', () => {
    counterFactory.value(100)
    counterFactory.increment()
    expect(counterFactory.value()).toBe(101)
  })

  test('Counter should decrement correctly from a new value', () => {
    counterFactory.value(200)
    counterFactory.decrement()
    expect(counterFactory.value()).toBe(199)
  })

  test('Multiple increments and decrements work as expected', () => {
    counterFactory.increment()
    counterFactory.increment()
    counterFactory.decrement()
    expect(counterFactory.value()).toBe(1)
  })

  test('Setting value directly and then incrementing works as expected', () => {
    counterFactory.value(5)
    counterFactory.increment()
    expect(counterFactory.value()).toBe(6)
  })

  test('Setting value directly and then decrementing works as expected', () => {
    counterFactory.value(3)
    counterFactory.decrement()
    expect(counterFactory.value()).toBe(2)
  })

  test('Counter should handle being set to 0 explicitly', () => {
    counterFactory.value(0)
    expect(counterFactory.value()).toBe(0)
    counterFactory.increment()
    expect(counterFactory.value()).toBe(1)
  })
})
