/* eslint global-require: 0 */
import optimizeHandler from '../../../src/utils/optimizeHandler'


jest.mock('../../../src/global.js')


describe('optimizeHandler()', () => {
  it('should return a function', () => {
    const callbackMock = jest.fn()

    const expected = 'function'
    const actual = typeof optimizeHandler(callbackMock)

    expect(actual).toEqual(expected)
  })

  it('should return callback when requestAnimationFrame does not exist for old browsers', () => {
    const callbackMock = jest.fn()

    const expected = callbackMock
    const actual = optimizeHandler(callbackMock)

    expect(actual).toEqual(expected)
  })

  describe('handler', () => {
    beforeEach(() => {
      require('../../../src/global.js').$$addRequestAnimationFrame()
    })

    /** Promised based timeout */
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    it('should call callback function', async () => {
      expect.assertions(1)

      const callbackMock = jest.fn()
      const handler = optimizeHandler(callbackMock)

      handler()
      await delay(17)

      const expected = 1
      const actual = callbackMock.mock.calls.length

      expect(actual).toEqual(expected)
    })

    it('should rate limit callback to one if called multiple times at once', async () => {
      expect.assertions(1)

      const callbackMock = jest.fn()
      const handler = optimizeHandler(callbackMock)

      /** Call handler 100 times */
      for (let i = 0; i < 100; i += 1) handler()
      await delay(17)

      const expected = 1
      const actual = callbackMock.mock.calls.length

      expect(actual).toEqual(expected)
    })

    it('should rate limit callback to max ~60 calls per second', async () => {
      expect.assertions(1)

      const callbackMock = jest.fn()
      const handler = optimizeHandler(callbackMock)

      /** Call handler every milisecond for one second */
      for (let ms = 0; ms < 1000; ms += 1) setTimeout(handler, ms)
      await delay(1017)

      const totalCalls = callbackMock.mock.calls.length

      const expected = true
      const actual = totalCalls <= 63

      expect(actual).toEqual(expected)
    })
  })
})
