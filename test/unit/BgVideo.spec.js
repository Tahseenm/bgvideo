/* eslint global-require: 0 */
import BgVideo from '../../src/BgVideo'
import window from '../../src/global'


/** Manually mock dependencies */
jest.mock('../../src/canPlayVideo.js')
jest.mock('../../src/resizeVideo.js')
jest.mock('../../src/elements.js')


describe('BgVideo Lib', () => {
  beforeEach(() => {
    require('../../src/elements.js').$$reset()
  })

  it('should throw error when no target is given', () => {
    expect(() => BgVideo()).toThrow()
  })

  it('should throw error when no video source is given', () => {
    expect(() => BgVideo('#banner')).toThrow()
  })

  it('should have the correct api methods', () => {
    const bgVid = BgVideo('#banner', 'example.com/cat.mp4')

    const expected = ['getVideoObject', 'resize', 'destroy', 'replaceVideo']
    const actual = Object.keys(bgVid)

    expect(actual).toEqual(expected)
  })

  it('should add wrapper element as first child of target element', () => {
    const target = require('../../src/elements.js').getTargetElem()
    BgVideo('#banner', 'example.com/cat.mp4')

    const expected = 1
    const actual = target.childElementCount

    expect(actual).toEqual(expected)
  })

  it('should save instance to BgVideo.lookup list', () => {
    const prevLength = BgVideo.lookup.length
    BgVideo('#banner', 'example.com/cat.mp4')

    const expected = prevLength + 1
    const actual = BgVideo.lookup.length

    expect(actual).toEqual(expected)
  })

  it('should save instance to BgVideo.lookup with id', () => {
    BgVideo('#banner', 'example.com/cat.mp4')

    const expected = true
    const actual = 'id' in BgVideo.lookup[0]

    expect(actual).toEqual(expected)
  })

  it('should save instance to BgVideo.lookup with resize method', () => {
    BgVideo('#banner', 'example.com/cat.mp4')

    const expected = true
    const actual = typeof BgVideo.lookup[0].resize === 'function'

    expect(actual).toEqual(expected)
  })

  const {
    $$setCanPlay,
    $$setCantPlay,
  } = require('../../src/canPlayVideo.js')

  describe('api.getVideoObject()', () => {
    it('should return video element when background video can be played', () => {
      $$setCanPlay()
      const bgVid = BgVideo('#banner', 'example.com/cat.mp4')

      const expected = true
      const actual = bgVid.getVideoObject() instanceof window.HTMLVideoElement

      expect(actual).toEqual(expected)
    })

    it('should return null when background video cannot be played', () => {
      $$setCantPlay()
      const bgVid = BgVideo('#banner', 'example.com/cat.mp4')

      const expected = null
      const actual = bgVid.getVideoObject()

      expect(actual).toEqual(expected)
    })
  })

  describe('api.resize()', () => {
    const resizeVideo = require('../../src/resizeVideo.js').default

    it('should not call resizeVideo when background video cannot be played', () => {
      $$setCantPlay()
      const bgVid = BgVideo('#banner', 'example.com/cat.mp4')
      bgVid.resize()

      const expected = 0
      const actual = resizeVideo.mock.calls.length

      expect(actual).toEqual(expected)
    })

    it('should call resizeVideo when background video can be played', () => {
      $$setCanPlay()
      const bgVid = BgVideo('#banner', 'example.com/cat.mp4')
      bgVid.resize()

      const expected = 1
      const actual = resizeVideo.mock.calls.length

      expect(actual).toEqual(expected)
    })
  })

  describe('api.destroy()', () => {
    it('should remove background video from target element', () => {
      const target = require('../../src/elements.js').getTargetElem()
      const bgVid = BgVideo('#banner', 'example.com/cat.mp4')

      const childCountWithWrapper = target.childElementCount
      bgVid.destroy()

      const expected = childCountWithWrapper - 1
      const actual = target.childElementCount

      expect(actual).toEqual(expected)
    })
  })

  describe('replaceVideo()', () => {
    it('should return null when background video cannot be played', () => {
      $$setCantPlay()
      const bgVid = BgVideo('#banner', 'example.com/cat.mp4')

      const expected = null
      const actual = bgVid.replaceVideo('example.com/dog.mp4')

      expect(actual).toEqual(expected)
    })

    it('should return video element when background video can play', () => {
      $$setCanPlay()
      const bgVid = BgVideo('#banner', 'example.com/cat.mp4')
      const src = 'example.com/dog.mp4'

      const expected = true
      const actual = bgVid.replaceVideo(src) instanceof window.HTMLVideoElement

      expect(actual).toEqual(expected)
    })
  })
})
