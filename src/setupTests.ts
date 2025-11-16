import '@testing-library/jest-dom'

if (typeof globalThis !== 'undefined' && !globalThis.TextEncoder) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { TextEncoder, TextDecoder } = require('util')
  globalThis.TextEncoder = TextEncoder
  globalThis.TextDecoder = TextDecoder
}
