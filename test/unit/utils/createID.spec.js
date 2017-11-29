import createID from '../../../src/utils/createID'


describe('createID()', () => {
  it('should return a string', () => {
    const expected = 'string'
    const actual = typeof createID()

    expect(actual).toEqual(expected)
  })

  it('should return a different string each time it is called', () => {
    const calls = 100
    const totalUnique = new Set(Array(100).fill().map(() => createID())).size

    const expected = true
    const actual = calls === totalUnique

    expect(actual).toEqual(expected)
  })
})
