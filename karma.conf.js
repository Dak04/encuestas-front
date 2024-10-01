module.exports = function (config) {
    config.set({
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'), // Añadir cobertura
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      reporters: ['progress', 'coverage'], // Añadir 'coverage'
      coverageReporter: {
        dir: require('path').join(__dirname, 'coverage/'),
        subdir: '.',
        reporters: [
          { type: 'html' },
          { type: 'lcov', subdir: '.', file: 'lcov.info' },
          { type: 'text-summary' }
        ],
        check: {
          global: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80
          }
        }
      },
      browsers: ['ChromeHeadless'],
      restartOnFileChange: true
    });
  };
  