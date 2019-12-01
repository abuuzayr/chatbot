/* global module:false */
/* eslint func-names: ["error", "never"] */

// set asset version as global variable
global['ASSET_VERSION'] = '1.42';

module.exports = function(grunt) {
  // Require plugin configurations in grunt folder
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: require('./grunt/sass'),
    concat: require('./grunt/concat'),
    uglify: require('./grunt/uglify'),
    postcss: require('./grunt/postcss'),
    cssmin: require('./grunt/cssmin'),
    bless: require('./grunt/bless'),
    htmlbuild: require('./grunt/htmlbuild'),
    clean: require('./grunt/clean'),
    copy: require('./grunt/copy'),
    watch: require('./grunt/watch'),
    connect: require('./grunt/connect'),
    countryEnvs: grunt.file.readJSON('./countries.json')
  });

  // get env from flag set for chatbot task
  var env = grunt.option('env') || 'dev';

  /**
   * The 3 numbered tasks below are the looping tasks that
   * generate the country/language folders in dist/
   */
  // (1) Register task to loop through the environments.
  grunt.task.registerMultiTask('countryEnvs', 'Loop through environments', function() {
    if (this.target === env) {
      grunt.config.set('countries', this.data);
      grunt.task.run('countries');
    }
  });

  // (2) Register task to loop through the countries.
  grunt.task.registerMultiTask('countries', 'Loop through countries', function() {
    grunt.option('country', this.target);
    grunt.option('country-lat', this.data.defaults.lat);
    grunt.option('country-long', this.data.defaults.long);
    grunt.config.set('country', this.data);
    grunt.task.run('country');
  });

  // (3) Register task to loop through each language in each country.
  grunt.task.registerMultiTask('country', 'Loop through languages for each country', function() {
    if (this.target !== 'defaults') {
      grunt.option('country-path', this.target);
      grunt.option('country-lang', this.data.lang);
      grunt.option('country-lang-url', this.data.url);
      grunt.task.run('copy:country');
      grunt.task.run('copy:countryMobile');
      grunt.task.run('copy:emoji');
    }
  });

  // JIT plugin loader
  // Declare static mappings
  require('jit-grunt')(grunt, {
    sasslint: 'grunt-sass-lint',
    htmlbuild: 'grunt-html-build'
  });

  // Tasks for generation of loader.js
  grunt.registerTask('loader', [
    'copy:chatbotStyles',
    'sass:loader',
    'postcss:loader',
    'cssmin:loader',
    'copy:chatbotClass',
    'uglify:loader',
    'copy:loader'
  ]);

  // Task for parsing handlebars templates & helpers into a single js file
  grunt.registerTask('hbs-templates', ['copy:hbs', 'copy:hbsjs', 'concat:templates']);

  // Task for chatbot development, with livereload on changes made to src files.
  grunt.registerTask('chatbot-serve', [
    'clean:dist',
    'sass:dev',
    'hbs-templates',
    'copy:fonts',
    'concat:dev',
    'htmlbuild:dist',
    'copy:main',
    'loader',
    'countryEnvs',
    'clean:country',
    'connect',
    'watch'
  ]);

  // Task for compilation of production ready chatbot files.
  grunt.registerTask('chatbot-prod', [
    'clean:dist',
    'clean:tmp',
    'sass:prod',
    'hbs-templates',
    'copy:fonts',
    'concat:prod',
    'uglify:prod',
    'postcss:main',
    'cssmin:nobless',
    'htmlbuild:dist',
    'copy:main',
    'loader',
    'countryEnvs',
    'clean:country',
    'clean:tmp'
  ]);

  // Set default grunt task.
  grunt.registerTask('default', 'chatbot-serve');
};
