module.exports = {
  prod: {
    options: {
      compress: true,
      mangle: false,
      preserveComments: false
    },
    files: {
      'dist/scripts/deps.min.js': [
        'src/base/js/external/jquery*.js',
        'src/vendor/webview-library.js',
        'src/base/js/external/bootstrap*.js'
      ],
      'dist/scripts/base.min.js': ['src/base/js/base.js'],
      'dist/scripts/modules.min.js': ['tmp/modules.min.js'],
      'dist/scripts/locationpicker.min.js': [
        'src/modules/active/locationpicker/locationpicker.jquery.js',
        'src/modules/active/locationpicker/locationpicker.js'
      ]
    }
  },
  loader: {
    options: {
      compress: true,
      mangle: false,
      preserveComments: false
    },
    src: ['tmp/chatbot.js'],
    dest: 'tmp/chatbot.js'
  }
};
