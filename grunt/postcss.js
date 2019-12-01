module.exports = {
  main: {
    options: {
      map: true, // inline sourcemaps
      processors: [
        require('postcss-preset-env')({
          browsers: ['> 5%', 'last 2 version', 'ie >= 8']
        })
      ]
    },
    files: {
      'tmp/main.css': ['tmp/main.css'],
      'tmp/modules.css': ['tmp/modules.css']
    }
  },
  loader: {
    options: {
      map: true, // inline sourcemaps
      processors: [
        require('postcss-preset-env')({
          browsers: ['> 5%', 'last 2 version', 'ie >= 8']
        })
      ]
    },
    files: {
      'tmp/chatbot.css': ['tmp/chatbot.css']
    }
  }
};
