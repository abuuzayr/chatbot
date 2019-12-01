module.exports = {
  icons: {
    files: [
      {
        expand: true,
        cwd: 'src/base/icons',
        src: ['*.svg'],
        dest: 'dist/icons'
      }
    ],
    options: {
      enhanceSVG: true
    }
  }
};
