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
      spacing: {
        '72': '18rem',
      },
      transitionDuration: {
        '3000': '3000ms',
      },
    },
    rotate: {
      '-30': '-30deg',
      '-60': '-60deg',
      '30': '30deg',
      '60': '60deg',
    },
  },
  variants: {
    fontSize: ['hover'],
    transitionTimingFunction: ['responsive', 'hover'],
  },
}
