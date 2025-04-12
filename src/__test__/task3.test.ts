import { getOrderStatus, OrderStatus } from '../main'
import { code } from './prepareTestEnvironment'

describe('getOrderStatus function', () => {
  test('correctly returns status messages', () => {
    expect(getOrderStatus(OrderStatus.Pending)).toEqual('Замовлення очікує на обробку')
    expect(getOrderStatus(OrderStatus.Shipped)).toEqual('Замовлення було відправлено')
    expect(getOrderStatus(OrderStatus.Delivered)).toEqual('Замовлення доставлено')
    expect(getOrderStatus(OrderStatus.Cancelled)).toEqual('Замовлення скасовано')
  })

  // Тест на перевірку присутності enum OrderStatus та коректної типізації функції
  test('Checks for the presence of OrderStatus enum and correct typing in function parameters', () => {
    const enumRegex = /enum\s+OrderStatus\s*{[\s\S]*?}/
    const functionParamRegex = /function\s+getOrderStatus\(status:\s*OrderStatus\):\s*string/

    const isEnumPresent = enumRegex.test(code)
    const isFunctionTypedCorrectly = functionParamRegex.test(code)

    if (!isEnumPresent) {
      throw new Error('OrderStatus enum is missing or incorrectly defined.')
    }

    if (!isFunctionTypedCorrectly) {
      throw new Error('Function getOrderStatus does not have correct parameter typing or return type.')
    }
  })
})
