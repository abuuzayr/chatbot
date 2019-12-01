module.exports = {
  bless: {
    options: {
      mergeIntoShorthands: false,
      roundingPrecision: -1
    },
    files: {
      'tmp/main.min.css': ['tmp/main.css'],
      'tmp/modules.min.css': ['tmp/modules.css']
    }
  },
  nobless: {
    options: {
      mergeIntoShorthands: false,
      roundingPrecision: -1
    },
    files: {
      'dist/styles/main.min.css': ['tmp/main.css'],
      'dist/styles/modules.min.css': ['tmp/modules.css']
    }
  },
  loader: {
    options: {
      mergeIntoShorthands: false,
      roundingPrecision: -1
    },
    files: {
      'tmp/chatbot.css': ['tmp/chatbot.css']
    }
  }
};
