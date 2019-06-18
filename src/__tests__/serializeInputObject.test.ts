import { serializeInputObject } from '../serializeInputObject'

test('serializeInputObject', () => {
  expect(serializeInputObject({})).toBe('')
  expect(serializeInputObject({ test1: 'test1val' })).toBe('test1=test1val')
  expect(serializeInputObject({ test1: 'test1val', test2: 'test2val' })).toBe(
    'test1=test1val&test2=test2val',
  )
  expect(serializeInputObject({ test: '😄', test2: undefined })).toBe(
    'test=%F0%9F%98%84',
  )
})
