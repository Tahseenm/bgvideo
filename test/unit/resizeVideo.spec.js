import resizeVideo, { safety } from '../../src/resizeVideo'
import window from '../../src/global'


/* :: Object -> HTMLDivElement */
const createCont = ({ width, height }) => {
  const elem = window.document.createElement('div')
  elem.style.width = `${width}px`
  elem.style.height = `${height}px`

  return elem
}

/**
 JSDOM doesn't allow creation of a video element with custom size
 */

/* :: Object -> Object */
const createVidMock = ({ width, height }) => {
  const elemMock = {
    videoWidth: width,
    videoHeight: height,
    style: {
      width: '',
      height: '',
    },
  }

  return elemMock
}


describe('resizeVideo()', () => {
  it('should set correct video width when video has a wider ratio', () => {
    const container = createCont({ width: 100, height: 100 })
    const video = createVidMock({ width: 1280, height: 720 })

    resizeVideo(container, video)

    const expected = 'auto'
    const actual = video.style.width

    expect(actual).toEqual(expected)
  })

  it('should set the correct video height when video has a wider ratio', () => {
    const container = createCont({ width: 100, height: 100 })
    const video = createVidMock({ width: 1280, height: 720 })

    resizeVideo(container, video)

    const expected = `${100 + (2 * safety)}px`
    const actual = video.style.height

    expect(actual).toEqual(expected)
  })

  it('should set the correct video width when container has a wider ratio', () => {
    const container = createCont({ width: 500, height: 100 })
    const video = createVidMock({ width: 300, height: 300 })

    resizeVideo(container, video)

    const expected = `${500 + (2 * safety)}px`
    const actual = video.style.width

    expect(actual).toEqual(expected)
  })

  it('should set the correct video height when container has a wider ratio', () => {
    const container = createCont({ width: 500, height: 100 })
    const video = createVidMock({ width: 300, height: 300 })

    resizeVideo(container, video)

    const expected = 'auto'
    const actual = video.style.height

    expect(actual).toEqual(expected)
  })
})
