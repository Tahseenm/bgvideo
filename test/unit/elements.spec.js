/* eslint global-require: 0, no-restricted-syntax: 0 */
import { getTargetElem, getVideoWrapperElem, getVideoElem } from '../../src/elements'
import { DEFAULT_OPTIONS } from '../../src/BgVideo'


jest.mock('../../src/global.js', () => {
  const {
    JSDOM,
  } = require('jsdom')

  const HTML = `
  <!DOCTYPE html>
  <html lang="en">
  <body>
    <section id="banner">
      <h1>Title</h1>
    <section>
  </body>
  </html>
  `
  const {
    window,
  } = new JSDOM(HTML)

  return window
})

/** Mocked Window object from above */
const $window = require('../../src/global')


describe('getTargetElem()', () => {
  it('should return a HTMLElement', () => {
    const elem = $window.document.querySelector('#banner')

    const expected = true
    const actual = getTargetElem(elem) instanceof $window.HTMLElement

    expect(actual).toEqual(expected)
  })

  it('should accept target as a query string', () => {
    const elemId = '#banner'

    const expected = true
    const actual = getTargetElem(elemId) instanceof $window.HTMLElement

    expect(actual).toEqual(expected)
  })

  it('should add position: relative when target is not a positioned element', () => {
    /** JSDOM returns empty string for non positioned elements instead of static */
    const elem = $window.document.querySelector('#banner')
    elem.style.position = 'static'

    const target = getTargetElem(elem)

    const expected = 'relative'
    const actual = target.style.position

    expect(actual).toEqual(expected)
  })

  it('should not postion target when it is already positioned', () => {
    const elem = $window.document.querySelector('#banner')
    elem.style.position = 'absolute'

    const target = getTargetElem(elem)

    const expected = 'absolute'
    const actual = target.style.position

    expect(actual).toEqual(expected)
  })

  it('should add a transparent background', () => {
    const elem = $window.document.querySelector('#banner')
    const target = getTargetElem(elem)

    const expected = 'transparent'
    const actual = target.style.background

    expect(actual).toEqual(expected)
  })
})


describe('getVideoWrapperElem()', () => {
  it('should return a HTML Element', () => {
    const vidWrapper = getVideoWrapperElem(DEFAULT_OPTIONS)

    const expected = true
    const actual = vidWrapper instanceof $window.HTMLElement

    expect(actual).toEqual(expected)
  })

  it('should return a Div Element', () => {
    const vidWrapper = getVideoWrapperElem(DEFAULT_OPTIONS)

    const expected = true
    const actual = vidWrapper instanceof $window.HTMLDivElement

    expect(actual).toEqual(expected)
  })

  it('should have the correct positioned styles', () => {
    const {
      style: {
        position,
        zIndex,
        top, right, bottom, left,
      },
    } = getVideoWrapperElem(DEFAULT_OPTIONS)

    const expected = {
      position: 'absolute',
      zIndex: '-1',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }

    const actual = {
      position,
      zIndex,
      top,
      right,
      bottom,
      left,
    }

    expect(actual).toEqual(expected)
  })

  it('should hide overflown content', () => {
    const vidWrapper = getVideoWrapperElem(DEFAULT_OPTIONS)

    const expected = 'hidden'
    const actual = vidWrapper.style.overflow

    expect(actual).toEqual(expected)
  })

  it('should have the given background color', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      backgroundColor: 'maroon',
    }

    const vidWrapper = getVideoWrapperElem(options)

    const expected = 'maroon'
    const actual = vidWrapper.style.backgroundColor

    expect(actual).toEqual(expected)
  })

  it('should have the given background image', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      backgroundImage: 'url(https://example.com/img/cat.jpg)',
    }

    const vidWrapper = getVideoWrapperElem(options)

    const expected = 'url(https://example.com/img/cat.jpg)'
    const actual = vidWrapper.style.backgroundImage

    expect(actual).toEqual(expected)
  })

  it('should have the correct background styles', () => {
    const {
      style: {
        backgroundRepeat,
        backgroundSize,
        backgroundPosition,
      },
    } = getVideoWrapperElem(DEFAULT_OPTIONS)

    const expected = {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }

    const actual = {
      backgroundRepeat,
      backgroundSize,
      backgroundPosition,
    }

    expect(actual).toEqual(expected)
  })

  it('should add the correct className', () => {
    const options = {
      ...DEFAULT_OPTIONS,
      className: 'customClassName',
    }

    const vidWrapper = getVideoWrapperElem(options)

    const expected = 'customClassName'
    const actual = vidWrapper.className

    expect(actual).toEqual(expected)
  })

  describe('overlay', () => {
    it('should exist', () => {
      const vidWrapper = getVideoWrapperElem(DEFAULT_OPTIONS)

      const expected = true
      const actual = !!vidWrapper.firstChild

      expect(actual).toEqual(expected)
    })

    it('should be a HTML Element', () => {
      const overlay = getVideoWrapperElem(DEFAULT_OPTIONS).firstChild

      const expected = true
      const actual = overlay instanceof $window.HTMLElement

      expect(actual).toEqual(expected)
    })

    it('should be a Div Element', () => {
      const overlay = getVideoWrapperElem(DEFAULT_OPTIONS).firstChild

      const expected = true
      const actual = overlay instanceof $window.HTMLDivElement

      expect(actual).toEqual(expected)
    })

    it('should have the correct positioned styles', () => {
      const overlay = getVideoWrapperElem(DEFAULT_OPTIONS).firstChild
      const {
        style: {
          position,
          top, right, bottom, left,
        },
      } = overlay

      const expected = {
        position: 'absolute',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      }

      const actual = {
        position,
        top,
        right,
        bottom,
        left,
      }

      expect(actual).toEqual(expected)
    })

    it('should have the given overlay color', () => {
      const options = {
        ...DEFAULT_OPTIONS,
        overlay: 'maroon',
      }

      const overlay = getVideoWrapperElem(options).firstChild

      const expected = 'maroon'
      const actual = overlay.style.backgroundColor

      expect(actual).toEqual(expected)
    })

    it('should have the given overlay opacity', () => {
      const options = {
        ...DEFAULT_OPTIONS,
        overlayOpacity: 0.45,
      }

      const overlay = getVideoWrapperElem(options).firstChild

      const expected = '0.45'
      const actual = overlay.style.opacity

      expect(actual).toEqual(expected)
    })
  })
})


describe('getVideoElem()', () => {
  it('should return a video Element', () => {
    const src = 'example.com/videos/foo.mp4'
    const videoElem = getVideoElem(src, DEFAULT_OPTIONS)

    const expected = true
    const actual = videoElem instanceof $window.HTMLVideoElement

    expect(actual).toEqual(expected)
  })

  it('should set the source for video', () => {
    const src = 'example.com/videos/foo.mp4'
    const videoElem = getVideoElem(src, DEFAULT_OPTIONS)

    const expected = src
    const actual = videoElem.src

    expect(actual).toEqual(expected)
  })

  it('should set the source when given as object', () => {
    const src = { mp4: 'example.com/videos/foo.mp4' }
    const videoElem = getVideoElem(src, DEFAULT_OPTIONS)

    const expected = src.mp4
    const actual = videoElem.querySelector('source[type$="mp4"]').src

    expect(actual).toEqual(expected)
  })

  it('should set multiple video sources', () => {
    const src = {
      mp4: 'example.com/videos/foo.mp4',
      webm: 'example.com/videos/foo.webm',
    }

    const videoElem = getVideoElem(src, DEFAULT_OPTIONS)

    const expected = src
    const actual = {
      mp4: videoElem.querySelector('source[type$="mp4"]').src,
      webm: videoElem.querySelector('source[type$="webm"]').src,
    }

    expect(actual).toEqual(expected)
  })

  describe('Video', () => {
    it('plays playsInline for iOS 10+', () => {
      const videoElem = getVideoElem('example.com/foo.mp4', DEFAULT_OPTIONS)

      const expected = true
      const actual = videoElem.playsInline

      expect(actual).toEqual(expected)
    })

    it('autoplays', () => {
      const videoElem = getVideoElem('example.com/foo.mp4', DEFAULT_OPTIONS)

      const expected = true
      const actual = videoElem.autoplay

      expect(actual).toEqual(expected)
    })
  })

  it('should set video loop', () => {
    const videoElem = getVideoElem('example.com/foo.mp4', DEFAULT_OPTIONS)

    const expected = DEFAULT_OPTIONS.loop
    const actual = videoElem.loop

    expect(actual).toEqual(expected)
  })

  it('should set the video volume', () => {
    const videoElem = getVideoElem('example.com/foo.mp4', DEFAULT_OPTIONS)

    const expected = DEFAULT_OPTIONS.volume
    const actual = videoElem.volume

    expect(actual).toEqual(expected)
  })

  it('should set the video mute', () => {
    const videoElem = getVideoElem('example.com/foo.mp4', DEFAULT_OPTIONS)

    const expected = DEFAULT_OPTIONS.muted
    const actual = videoElem.defaultMuted

    expect(actual).toEqual(expected)
  })

  it('should set the video playbackRate', () => {
    const videoElem = getVideoElem('example.com/foo.mp4', DEFAULT_OPTIONS)

    const expected = DEFAULT_OPTIONS.playbackRate
    const actual = videoElem.defaultPlaybackRate

    expect(actual).toEqual(expected)
  })

  describe('video Element styles', () => {
    it('should contain postioned styles', () => {
      const videoElem = getVideoElem('example.com/foo.mp4', DEFAULT_OPTIONS)

      const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }

      for (const prop of Object.keys(styles)) {
        const expected = styles[prop]
        const actual = videoElem.style[prop]

        expect(actual).toEqual(expected)
      }
    })

    it('should be visibly hidden', () => {
      const {
        style: {
          opacity,
          visibility,
        },
      } = getVideoElem('example.com/foo.mp4', DEFAULT_OPTIONS)

      const expected = true
      const actual = opacity === '0' && visibility === 'hidden'

      expect(actual).toEqual(expected)
    })

    it('should contain given filter styles', () => {
      const options = {
        ...DEFAULT_OPTIONS,
        filter: 'blur(3px) grayscale(0.5)',
      }

      const videoElem = getVideoElem('example.com/foo.mp4', options)

      const expected = options.filter
      const actual = videoElem.style.filter

      expect(actual).toEqual(expected)
    })
  })
})
