let grunt = require('grunt');

module.exports = {
  main: {
    files: [
      {
        expand: true,
        flatten: true,
        src: ['src/base/images/**', 'src/vendor/images/**'],
        dest: 'dist/images/',
        filter: 'isFile'
      },
      {
        expand: true,
        flatten: true,
        src: ['src/base/js/env.js', 'src/base/livechat.html'],
        dest: 'dist/'
      },
      {
        expand: true,
        flatten: true,
        src: ['src/base/js/external/bowser.min.js'],
        dest: 'dist/scripts/'
      }
    ]
  },
  hbs: {
    options: {
      process: (content, srcpath) => {
        const templateName = srcpath
          .split('/')
          [srcpath.split('/').length - 1].split('.')[0]
          .replace('_', '');
        const templateStart = `let customTemplate${templateName.substr(0, 1).toUpperCase() +
          templateName.substr(1)}="`;
        return `${templateStart}${content
          .replace(/["]/g, '\\"')
          .replace(/(\r\n|\r|\n)/g, '" + "')
          .replace(/[\t]/g, '')}";`;
      }
    },
    files: [
      {
        expand: true,
        flatten: true,
        src: ['src/templates/*.handlebars'],
        dest: 'tmp/templates/',
        filter: 'isFile',
        rename: (dest, src) => dest + src.replace(/\.handlebars$/, '.js')
      }
    ]
  },
  hbsjs: {
    options: {
      process: (content, srcpath) => {
        const helperName = srcpath
          .split('/')
          [srcpath.split('/').length - 1].split('.')[0]
          .replace('_', '');
        const helperStart = `Handlebars.registerHelper('${helperName}',`;
        return `${helperStart}${content.replace('module.exports = ', '')});`.replace(
          '};\n);',
          '});'
        );
      }
    },
    files: [
      {
        expand: true,
        flatten: true,
        src: ['src/templates/*.js'],
        dest: 'tmp/templates/',
        filter: 'isFile'
      }
    ]
  },
  country: {
    options: {
      process: (content, srcpath) => {
        if (srcpath.includes('.js')) {
          var langUrl = grunt.option('country-lang-url');
          if ('object' === typeof grunt.option('country-lang-url')) {
            langUrl = grunt.option('country-lang-url')['prod'];
          }
          return content.replace("serverDomain = ''", `serverDomain = '${langUrl}'`);
        } else if (srcpath.includes('index.html')) {
          let lang =
            typeof grunt.option('country-lang') != 'undefined'
              ? grunt.option('country-lang')
              : null;
          if ('object' === typeof grunt.option('country-lang-url')) {
            content = content.replace(
              'serverDomains = null',
              `serverDomains = {
                'prod': '${grunt.option('country-lang-url')['prod']}',
                'pre-prod': '${grunt.option('country-lang-url')['pre-prod']}'
              }`
            );
          }
          content = content.replace('// G:RWDLAT', grunt.option('country-lat'));
          content = content.replace('// G:RWDLONG', grunt.option('country-long'));
          content = content.replace('// G:RWCountry', grunt.option('country'));
          content = content.replace(/ASSET_VERSION/g, global.ASSET_VERSION);
          return lang ? content.replace('<html>', `<html lang="${lang}">`) : content;
        } else {
          return content;
        }
      }
    },
    files: [
      {
        expand: true,
        flatten: true,
        src: ['dist/index.html', 'dist/env.js'],
        dest: 'dist/<%= grunt.option("country") %>/<%= grunt.option("country-path") %>/',
        filter: 'isFile'
      }
    ]
  },
  countryMobile: {
    options: {
      process: (content, srcpath) => {
        content = content.replace('<body>', '<body class="header-on">');
        content = content.replace('<head>', '<head><script>window._chatbotLoad = true;</script>');
        content = content.replace("var windowTarget = '_blank'", "var windowTarget = '_system'");
        content = content.replace(
          'kai.init();',
          "kai.init();kai.getUserDeviceContext().type = 'mobile';"
        );
        return content;
      }
    },
    files: [
      {
        expand: true,
        flatten: true,
        cwd: 'dist/<%= grunt.option("country") %>/<%= grunt.option("country-path") %>/',
        src: ['index.html'],
        filter: 'isFile',
        rename: () =>
          'dist/<%= grunt.option("country") %>/<%= grunt.option("country-path") %>/mobile.html'
      }
    ]
  },
  fonts: {
    options: {
      process: (content, srcpath) => {
        return content.replace(
          new RegExp('../fonts/', 'g'),
          'https://av.sc.com/assets/global/fonts/'
        );
      }
    },
    files: [
      {
        expand: true,
        flatten: true,
        src: ['tmp/style.css'],
        dest: 'tmp',
        filter: 'isFile'
      }
    ]
  },
  chatbotStyles: {
    files: [
      {
        expand: true,
        cwd: '../../../scss/modules/click-to-chat/',
        src: ['_click-to-chat__chatbot.scss'],
        dest: 'tmp/',
        rename: () => 'tmp/chatbot.scss'
      }
    ]
  },
  chatbotClass: {
    options: {
      process: (content, srcpath) => {
        let camelCasing = grunt.file
          .read('../../commons/camel-casing.js')
          .replace('export default camelCasing;', '');
        let chatbotClass = content.replace(
          "import camelCasing from '../commons/camel-casing';",
          `${camelCasing}`
        );
        return chatbotClass.replace('export default Chatbot;', '').replace(/\blet\b/g, 'var');
      }
    },
    files: [
      {
        expand: true,
        cwd: '../../commons',
        src: ['chatbot.js'],
        dest: 'tmp/'
      }
    ]
  },
  loader: {
    options: {
      process: (content, srcpath) => {
        let styles = grunt.file.read('tmp/chatbot.css');
        let chatbotClass = grunt.file.read('tmp/chatbot.js').replace(/["]/g, '\\"');
        return content
          .replace('// G:ACSB', `chatbotStyles = "${styles}";`)
          .replace('// G:ACCB', `chatbotClassScript = "${chatbotClass}"`);
      }
    },
    files: [
      {
        expand: true,
        src: ['loader.js'],
        dest: 'dist/'
      }
    ]
  },
  emoji: {
    files: [
      {
        expand: true,
        flatten: false,
        cwd: 'src/base/icons/twemoji',
        src: ['**'],
        dest:
          'dist/<%= grunt.option("country") %>/<%= grunt.option("country-path") %>/images/twemoji/72x72'
      }
    ]
  }
};
