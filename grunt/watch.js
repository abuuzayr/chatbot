module.exports = {
  html: {
    options: {
      livereload: true
    },
    files: ['src/**/*.html'],
    tasks: ['htmlbuild', 'copy:main', 'countryEnvs']
  },
  js: {
    options: {
      livereload: true
    },
    files: ['src/base/**/*.js', 'src/modules/**/*.js', 'src/vendor/**/*.js'],
    tasks: ['concat:dev']
  },
  sass: {
    options: {
      livereload: true
    },
    files: ['src/**/*.scss'],
    tasks: ['sass:dev', 'concat:dev']
  },
  css: {
    options: {
      livereload: true
    },
    files: ['src/**/*.css'],
    tasks: ['concat:dev']
  },
  images: {
    options: {
      livereload: true
    },
    files: ['src/**/*.{gif,jpg,jpeg,png,svg,webp}'],
    tasks: ['copy:main', 'countryEnvs']
  },
  hbs: {
    options: {
      livereload: true
    },
    files: ['src/templates/**/*'],
    tasks: ['hbs-templates']
  },
  countries: {
    options: {
      livereload: true
    },
    files: ['countries.json'],
    tasks: ['clean:countries', 'htmlbuild', 'copy:main', 'countryEnvs', 'clean:country']
  }
};
