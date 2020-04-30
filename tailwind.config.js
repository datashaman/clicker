module.exports = {
  important: false,
  plugins: [],
  prefix: '',
  separator: ':',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      transitionDuration: {
        '3000': '3000ms',
      },
    },
  },
  variants: {
    fontSize: ['hover'],
    transitionTimingFunction: ['responsive', 'hover'],
  },
}
