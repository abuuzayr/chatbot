module.exports = {
  dev: {
    files: {
      'tmp/style.css': 'src/base/scss/base.scss',
      'dist/styles/modules.min.css': 'src/modules/active/modules.scss',
      'tmp/chatbot.css': '../../../scss/modules/click-to-chat/_click-to-chat__chatbot.scss'
    }
  },
  prod: {
    files: {
      'tmp/style.css': 'src/base/scss/base.scss',
      'tmp/modules.css': 'src/modules/active/modules.scss'
    }
  },
  loader: {
    files: {
      'tmp/chatbot.css': 'tmp/chatbot.scss'
    }
  }
};
