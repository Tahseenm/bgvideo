import { JSDOM } from 'jsdom'
import { prepend } from '../../../src/utils/dom'


const HTML = `
<!DOCTYPE html>
<html lang="en">
<body>
  <section id="parent">
    <p>Lorem Ipsum 1</p>
    <p>Lorem Ipsum 2</p>
  </section>

  <section id="empty-parent"></section>
</body>
</html>`


describe('prepend()', () => {
  const {
    window: {
      document,
    },
  } = new JSDOM(HTML)


  it('should add element as the first child', () => {
    const parent = document.getElementById('parent')
    const elem = document.createElement('p')

    prepend(elem, parent)

    const expected = elem
    const actual = parent.firstChild

    expect(actual).toEqual(expected)
  })

  it('should preprend element when parent element is empty', () => {
    const emptyParent = document.getElementById('empty-parent')
    const elem = document.createElement('p')

    prepend(elem, emptyParent)

    const expected = elem
    const actual = emptyParent.firstChild

    expect(actual).toEqual(expected)
  })
})
