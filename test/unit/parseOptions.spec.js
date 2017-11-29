import parseOptions, { parseBgImage, parseFilter } from '../../src/parseOptions'
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
    const expected = DEFAULT_OPTIONS
    const actual = parseOptions(DEFAULT_OPTIONS, {})

    expect(actual).toEqual(expected)
  })

  it('should parse library options which need parsing', () => {
    const options = {
      muted: false,
      backgroundColor: '#fff',
      backgroundImage: 'https://example.com/foo.jpg',
      filter: {
        blur: '3px',
      },
    }

    const expected = {
      ...DEFAULT_OPTIONS,
      muted: false,
      backgroundColor: '#fff',
      backgroundImage: parseBgImage('https://example.com/foo.jpg'),
      filter: parseFilter({ blur: '3px' }),
    }

    const actual = parseOptions(DEFAULT_OPTIONS, options)

    expect(actual).toEqual(expected)
  })
})
