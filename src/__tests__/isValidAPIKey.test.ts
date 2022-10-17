import { isValidAPIKey } from '../isValidAPIKey'

test('isValidAPIKey', () => {
  expect(isValidAPIKey('')).toBe(false)
  expect(isValidAPIKey('av-')).toBe(false)
  expect(isValidAPIKey('c79c5dc37e20e45325f830dee95c15c8')).toBe(false)
})
