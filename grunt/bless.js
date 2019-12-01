module.exports = {
  options: {
    compress: true
  },
  css: {
    files: {
      'dist/styles/main.min.css': 'tmp/main.min.css',
      'dist/styles/modules.min.css': 'tmp/modules.min.css'
    }
  }
};
