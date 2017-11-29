/* eslint global-require: 0 */
import handleWindowResize from '../../src/handleWindowResize'
import { getEventNames, trigger } from './helpers/events'


jest.mock('../../src/utils/index.js', () => ({
  optimizeHandler: cb => cb,
}))

jest.mock('../../src/global.js', () => {
  const {
    JSDOM,
  } = require('jsdom')

  const {
    window,
  } = new JSDOM('')
  window.addEventListener = jest.fn()

  return window
})


describe('handleWindowResize()', () => {
  const $window = require('../../src/global.js')
  beforeEach(() => {
    $window.addEventListener.mockClear()
  })

  it('should add a `resize` event listener on browser window object', () => {
    handleWindowResize([])
    const eventsAdded = getEventNames($window)

    const expected = true
    const actual = eventsAdded.includes('resize')

    expect(actual).toEqual(expected)
  })

  it('should resize all BgVideo instances when window is resized', () => {
    const bgVideos = Array(5).fill().map(() => ({ resize: jest.fn() }))

    handleWindowResize(bgVideos)
    trigger('resize', $window)

    const videoIsResized = bgVideo => bgVideo.resize.mock.calls.length === 1

    const expected = true
    const actual = bgVideos.every(videoIsResized)

    expect(actual).toEqual(expected)
  })
})
