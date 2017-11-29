import { JSDOM } from 'jsdom'


const {
  window,
} = new JSDOM('')


global.window = window
