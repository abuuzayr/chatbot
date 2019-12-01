module.exports = {
  dist: {
    src: 'src/base/base.html',
    dest: 'dist/index.html',
    options: {
      beautify: true,
      relative: true,
      basePath: false,
      sections: {
        modules: 'src/modules/active/**/*.html'
      }
    }
  }
};
