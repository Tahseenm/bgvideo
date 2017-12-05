import parseOptions, {
  parseBgImage,
  parseBgPosition,
  parseFilter,
} from '../../src/parseOptions'

import { DEFAULT_OPTIONS } from '../../src/BgVideo'


describe('parseBgImage()', () => {
  it('should return correct format', () => {
    const input = 'https://example.com/foo.jpg'

    const expected = 'url(https://example.com/foo.jpg)'
    const actual = parseBgImage(input)

    expect(actual).toEqual(expected)
  })

  it('should handle input of `none`', () => {
    const input = 'none'

    const expected = input
    const actual = parseBgImage(input)

    expect(actual).toEqual(expected)
  })
})


describe('parseBgPosition()', () => {
  it('should return a object with x & y properties', () => {
    const result = parseBgPosition('left top')

    const expected = true
    const actual = 'x' in result && 'y' in result

    expect(actual).toEqual(expected)
  })

  it('should return the correct x & y position', () => {
    const expected = { x: '0%', y: '0%' }
    const actual = parseBgPosition('left top')

    expect(actual).toEqual(expected)
  })

  it('should handle a single keyword position', () => {
    const expected = { x: '100%', y: '50%' }
    const actual = parseBgPosition('right')

    expect(actual).toEqual(expected)
  })

  it('should parse string with multiple spaces', () => {
    const expected = { x: '0%', y: '0%' }
    const actual = parseBgPosition('     left       top   ')

    expect(actual).toEqual(expected)
  })

  it('should parse keywords with uppercase characters', () => {
    const expected = { x: '0%', y: '0%' }
    const actual = parseBgPosition('Left TOP')

    expect(actual).toEqual(expected)
  })

  it('should parse custom percentage position', () => {
    const expected = { x: '25%', y: '25%' }
    const actual = parseBgPosition('25% 25%')

    expect(actual).toEqual(expected)
  })
})


describe('parseFilter()', () => {
  it('should handle input of `none`', () => {
    const input = 'none'

    const expected = input
    const actual = parseFilter(input)

    expect(actual).toEqual(expected)
  })

  it('should handle filter input as string', () => {
    const input = 'blur(3px) grayscale(0.5) contrast(200%) invert(75%)'

    const expected = input
    const actual = parseFilter(input)

    expect(actual).toEqual(expected)
  })

  it('should parse filter object into a string', () => {
    const input = {
      blur: '3px',
      contrast: '200%',
      grayscale: '0.5',
      invert: '75%',
    }

    const expected = 'blur(3px) contrast(200%) grayscale(0.5) invert(75%)'
    const actual = parseFilter(input)

    expect(actual).toEqual(expected)
  })
})


describe('parseOptions()', () => {
  it('should return default options when given empty options', () => {
    const expected = {
      ...DEFAULT_OPTIONS,
      backgroundPosition: { x: '50%', y: '50%' },
    }

    const actual = parseOptions(DEFAULT_OPTIONS, {})

    expect(actual).toEqual(expected)
  })

  it('should merge given options with default options', () => {
    const options = {
      loop: false,
      muted: false,
      volume: 0.25,
      playbackRate: 1.5,
      playOnMobile: false,
      playOnReducedMotion: true,
    }

    const expected = {
      ...DEFAULT_OPTIONS,
      backgroundPosition: { x: '50%', y: '50%' },
      ...options,
    }

    const actual = parseOptions(DEFAULT_OPTIONS, options)

    expect(actual).toEqual(expected)
  })

  it('should parse library options which need parsing', () => {
    const options = {
      backgroundImage: 'https://example.com/foo.jpg',
      backgroundPosition: 'left top',
      filter: {
        blur: '3px',
      },
    }

    const expected = {
      ...DEFAULT_OPTIONS,
      backgroundImage: parseBgImage('https://example.com/foo.jpg'),
      backgroundPosition: parseBgPosition('left top'),
      filter: parseFilter({ blur: '3px' }),
    }

    const actual = parseOptions(DEFAULT_OPTIONS, options)

    expect(actual).toEqual(expected)
  })
})
