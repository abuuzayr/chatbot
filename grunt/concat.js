module.exports = {
  dev: {
    files: {
      'dist/scripts/deps.min.js': [
        'src/vendor/webview-library.js',
        'src/base/js/external/bootstrap*.js'
      ],
      'dist/scripts/base.min.js': ['src/base/js/base.js'],
      'dist/scripts/modules.min.js': [
        'src/modules/active/**/*.js',
        '!src/modules/active/**/location*.js'
      ],
      'dist/styles/main.min.css': [
        'src/vendor/webview-library.css',
        'src/base/css/**/*.css',
        'tmp/style.css'
      ],
      'dist/scripts/locationpicker.min.js': [
        'src/modules/active/locationpicker/locationpicker.jquery.js',
        'src/modules/active/locationpicker/locationpicker.js'
      ]
    }
  },
  prod: {
    files: {
      'tmp/deps.min.js': ['src/vendor/webview-library.js', 'src/base/js/external/bootstrap*.js'],
      'tmp/modules.min.js': ['src/modules/active/**/*.js', '!src/modules/active/**/location*.js'],
      'tmp/main.css': ['src/vendor/webview-library.css', 'src/base/css/**/*.css', 'tmp/style.css']
    }
  },
  templates: {
    files: {
      'dist/scripts/templates.min.js': ['tmp/templates/*.js']
    }
  }
};
