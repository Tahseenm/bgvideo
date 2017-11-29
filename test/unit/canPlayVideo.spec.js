/* eslint global-require: 0 */
import canPlayVideo from '../../src/canPlayVideo'
import { DEFAULT_OPTIONS } from '../../src/BgVideo'


/** Mock browser window & device helper functions */
jest.mock('../../src/global.js')
jest.mock('../../src/utils/user.js')

const setDevice = require('../../src/utils/user.js').$$setDevice


describe('canPlayVideo()', () => {
  it('should return a boolean', () => {
    const expected = 'boolean'
    const actual = typeof canPlayVideo(DEFAULT_OPTIONS)

    expect(actual).toEqual(expected)
  })

  describe('Desktop browsers', () => {
    it('should play with default library options (video is muted & do not play on reduced motion)', () => {
      setDevice({ mobile: false })

      const expected = true
      const actual = canPlayVideo(DEFAULT_OPTIONS)

      expect(actual).toEqual(expected)
    })

    it('should play when video is not muted', () => {
      setDevice({ mobile: false })
      const libOpts = { ...DEFAULT_OPTIONS, muted: false }

      const expected = true
      const actual = canPlayVideo(libOpts)

      expect(actual).toEqual(expected)
    })

    it('should NOT play when user prefers reduced motion by default', () => {
      setDevice({ mobile: false, reducedMotion: true })

      const expected = false
      const actual = canPlayVideo(DEFAULT_OPTIONS)

      expect(actual).toEqual(expected)
    })

    it('should play when user prefers reduced motion & `playOnReducedMotion` is set to true', () => {
      setDevice({ mobile: false, reducedMotion: true })
      const libOpts = { ...DEFAULT_OPTIONS, playOnReducedMotion: true }

      const expected = true
      const actual = canPlayVideo(libOpts)

      expect(actual).toEqual(expected)
    })
  })

  describe('Mobile browsers excluding iOS 10+', () => {
    const expected = false

    it('should NOT play with default library options', () => {
      setDevice({ mobile: true })
      const actual = canPlayVideo(DEFAULT_OPTIONS)

      expect(actual).toEqual(expected)
    })

    it('should NOT play when video is not muted', () => {
      setDevice({ mobile: true })
      const libOpts = { ...DEFAULT_OPTIONS, muted: false }

      const actual = canPlayVideo(libOpts)

      expect(actual).toEqual(expected)
    })

    it('should NOT play when user prefers reduced motion by default', () => {
      setDevice({ mobile: true, reducedMotion: true })
      const actual = canPlayVideo(DEFAULT_OPTIONS)

      expect(actual).toEqual(expected)
    })

    it('should NOT play when user prefers reduced motion & `playOnReducedMotion` is set to true', () => {
      setDevice({ mobile: true, reducedMotion: true })
      const libOpts = { ...DEFAULT_OPTIONS, playOnReducedMotion: true }

      const actual = canPlayVideo(libOpts)

      expect(actual).toEqual(expected)
    })
  })

  describe('iOS 10+ devices', () => {
    it('should play with default library options', () => {
      setDevice({ mobile: { isNewIOS: true } })

      const expected = true
      const actual = canPlayVideo(DEFAULT_OPTIONS)

      expect(actual).toEqual(expected)
    })

    it('should NOT play when video is not muted', () => {
      setDevice({ mobile: { isNewIOS: true } })
      const libOpts = { ...DEFAULT_OPTIONS, muted: false }

      const expected = false
      const actual = canPlayVideo(libOpts)

      expect(actual).toEqual(expected)
    })

    it('should NOT play when `playOnMobile` options is set to false', () => {
      setDevice({ mobile: { isNewIOS: true } })
      const libOpts = { ...DEFAULT_OPTIONS, muted: false }

      const expected = false
      const actual = canPlayVideo(libOpts)

      expect(actual).toEqual(expected)
    })

    it('should NOT play when user prefers reduced motion by default', () => {
      setDevice({
        mobile: { isNewIOS: true },
        reducedMotion: true,
      })

      const expected = false
      const actual = canPlayVideo(DEFAULT_OPTIONS)

      expect(actual).toEqual(expected)
    })

    it('should play when user prefers reduced motion & `playOnReducedMotion` is set to true', () => {
      setDevice({
        mobile: { isNewIOS: true },
        reducedMotion: true,
      })
      const libOpts = { ...DEFAULT_OPTIONS, playOnReducedMotion: true }

      const expected = true
      const actual = canPlayVideo(libOpts)

      expect(actual).toEqual(expected)
    })
  })
})
