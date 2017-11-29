import { isMobile, isNewIOS, prefersReducedMotion } from '../../../src/utils/user'
import windowMock from '../windowMock'


describe('isMobile()', () => {
  it('should return a boolean', () => {
    const window = windowMock()

    const expected = 'boolean'
    const actual = typeof isMobile(window)

    expect(actual).toEqual(expected)
  })

  describe('Mobile Devices', () => {
    it('should return true for a android device', () => {
      const window = windowMock('android')

      const expected = true
      const actual = isMobile(window)

      expect(actual).toEqual(expected)
    })

    it('should return true for a windows mobile device', () => {
      const window = windowMock('ieMobile')

      const expected = true
      const actual = isMobile(window)

      expect(actual).toEqual(expected)
    })

    it('should return true for iphone', () => {
      const window = windowMock('iphone')

      const expected = true
      const actual = isMobile(window)

      expect(actual).toEqual(expected)
    })

    it('should return true for ipad', () => {
      const window = windowMock('ipad')

      const expected = true
      const actual = isMobile(window)

      expect(actual).toEqual(expected)
    })
  })

  describe('Desktop Devices', () => {
    it('should return false for Chrome on destop', () => {
      const window = windowMock('chrome')

      const expected = false
      const actual = isMobile(window)

      expect(actual).toEqual(expected)
    })

    it('should return false for Internet Explorer', () => {
      const window = windowMock('ie')

      const expected = false
      const actual = isMobile(window)

      expect(actual).toEqual(expected)
    })

    it('should return false for Firefox', () => {
      const window = windowMock('firefox')

      const expected = false
      const actual = isMobile(window)

      expect(actual).toEqual(expected)
    })

    it('should return false for mac OS Safari', () => {
      const window = windowMock('safari')

      const expected = false
      const actual = isMobile(window)

      expect(actual).toEqual(expected)
    })
  })
})


describe('isNewIOS()', () => {
  it('should return a boolean', () => {
    const window = windowMock('iphone')

    const expected = 'boolean'
    const actual = typeof isNewIOS(window)

    expect(actual).toEqual(expected)
  })

  it('should return false when device is not iOS', () => {
    const window = windowMock('ieMobile')

    const expected = false
    const actual = isNewIOS(window)

    expect(actual).toEqual(expected)
  })

  it('should return false for when video cannot be played inline — iOS 9-', () => {
    const window = windowMock('iphone', { playsInline: false })

    const expected = false
    const actual = isNewIOS(window)

    expect(actual).toEqual(expected)
  })

  it('should return true for when video can be played inline — iOS 10+', () => {
    const window = windowMock('iphone', { playsInline: true })

    const expected = true
    const actual = isNewIOS(window)

    expect(actual).toEqual(expected)
  })
})


describe('prefersReducedMotion()', () => {
  it('should return a boolean', () => {
    const window = windowMock()

    const expected = false
    const actual = prefersReducedMotion(window)

    expect(actual).toEqual(expected)
  })

  it('should return true when user has turned on reduced motion', () => {
    const window = windowMock('safari', { reducedMotion: true })

    const expected = true
    const actual = prefersReducedMotion(window)

    expect(actual).toEqual(expected)
  })

  it('should return false when a user has not turned on reduced motion', () => {
    const window = windowMock('safari', { reducedMotion: false })

    const expected = false
    const actual = prefersReducedMotion(window)

    expect(actual).toEqual(expected)
  })
})
