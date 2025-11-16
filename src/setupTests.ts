import '@testing-library/jest-dom'

if (typeof globalThis !== 'undefined' && !globalThis.TextEncoder) {
  const { TextEncoder, TextDecoder } = require('util')
  globalThis.TextEncoder = TextEncoder
  globalThis.TextDecoder = TextDecoder
}
