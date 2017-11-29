import setBgVideo from '../../src/setBgVideo'
import window from '../../src/global'
import { getEventNames, trigger } from './helpers/events'


jest.mock('../../src/resizeVideo.js', () => jest.fn())
const resizeVideo = require('../../src/resizeVideo.js')


/**
 Helpers
 -------
 [1]. Mock `addEventListener` method
 */

/* :: () -> Array<HTMLElement> */
const getElems = () => {
  const wrapperElem = window.document.createElement('div')
  const videoElem   = window.document.createElement('video')

  videoElem.addEventListener = jest.fn()  /* [1] */

  return [wrapperElem, videoElem]
}


describe('setBgVideo()', () => {
  it('should insert video element into given video wrapper element', () => {
    const [wrapperElem, videoElem] = getElems()

    setBgVideo(wrapperElem, videoElem)

    const expected = videoElem
    const actual = wrapperElem.firstChild

    expect(actual).toEqual(expected)
  })

  it('should add 2 event listeners to the video element', () => {
    const [wrapperElem, videoElem] = getElems()

    setBgVideo(wrapperElem, videoElem)

    const expected = 2
    const actual = videoElem.addEventListener.mock.calls.length

    expect(actual).toEqual(expected)
  })

  it('should add an event listener of type `loadedmetadata` to the video element', () => {
    const [wrapperElem, videoElem] = getElems()

    setBgVideo(wrapperElem, videoElem)
    const events = getEventNames(videoElem)

    const expected = true
    const actual = events.includes('loadedmetadata')

    expect(actual).toEqual(expected)
  })

  it('should resize video once video meta data has been loaded', () => {
    const [wrapperElem, videoElem] = getElems()

    setBgVideo(wrapperElem, videoElem)
    trigger('loadedmetadata', videoElem)

    const expected = 1
    const actual = resizeVideo.mock.calls.length

    expect(actual).toEqual(expected)
  })

  it('should add an event listener of type `playing` to the video element', () => {
    const [wrapperElem, videoElem] = getElems()

    setBgVideo(wrapperElem, videoElem)
    const events = getEventNames(videoElem)

    const expected = true
    const actual = events.includes('playing')

    expect(actual).toEqual(expected)
  })

  it('should make video visible once it is playing', () => {
    const [wrapperElem, videoElem] = getElems()

    setBgVideo(wrapperElem, videoElem)
    trigger('playing', videoElem)

    const expected = true
    const actual = (
      videoElem.style.opacity === '1' &&
      videoElem.style.visibility !== 'hidden')

    expect(actual).toEqual(expected)
  })
})
