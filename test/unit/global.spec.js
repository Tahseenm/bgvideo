import window from '../../src/global'


describe('window', () => {
  it('should be the same as the global window object', () => {
    const expected = global.window
    const actual = window

    expect(actual).toEqual(expected)
  })
})
