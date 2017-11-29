import { isString, required } from '../../../src/utils/misc'


describe('isString()', () => {
  it('should return `true` for string types', () => {
    const expected = true
    const actual = isString('foobar')

    expect(actual).toEqual(expected)
  })

  it('should return `false` for non-string types', () => {
    const invalid = [undefined, null, NaN, 1, true, {}, [], Symbol('abc')]

    invalid.forEach((input) => {
      const expected = false
      const actual = isString(input)

      expect(actual).toEqual(expected)
    })
  })
})



describe('required()', () => {
  it('should throw when called', () => {
    expect(() => required()).toThrow()
  })
})
