import { isValidAPIKey } from '../isValidAPIKey'

test('isValidAPIKey', () => {
  expect(isValidAPIKey('')).toBe(false)
  expect(isValidAPIKey('av-')).toBe(false)
  expect(isValidAPIKey('c79c5dc37e20e45325f830dee95c15c8')).toBe(false)
  expect(isValidAPIKey('av-e7160cb71e8db0e574de5e8a4d914d61')).toBe(true)
  expect(isValidAPIKey('av-df799342fa9405da27916bcc96e46a5e')).toBe(true)
  expect(isValidAPIKey('av-cd180873104fe2eb1edb20297b8d024e')).toBe(true)
  expect(isValidAPIKey('av-416b1aa14fd1d8bed9b53979bbb64293')).toBe(true)
  expect(isValidAPIKey('df-416b1aa14fd1d8bed9b53979bbb64293')).toBe(true)
})
