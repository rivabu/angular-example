module.exports = function(config){
  config.set({
    //  root path location that will be used to resolve all relative paths in files and exclude sections
    basePath : '../',

    // files to include, ordered by dependencies
    files : [
      // include relevant Angular files and libs
      'app/lib/angular/angular.js',
      'test/lib/angular-mocks.js',
      
      // include JS files
      'app/js/**/*.js',
      'app/js/app.js',
    
      // include html template files
      // 'app/partials/directives/*.html',
      // 'app/partials/*.html',

      // include unit test specs
      'test/unit/*.js'
    ], 
    // files to exclude
    exclude : [
      'app/lib/angular/angular-loader.js'
      , 'app/lib/angular/*.min.js'
      , 'app/lib/angular/angular-scenario.js'
    ],

    // karma has its own autoWatch feature but Grunt watch can also do this
    autoWatch : false,

    // testing framework, be sure to install the correct karma plugin
    frameworks: ['jasmine'],

    // browsers to test against, be sure to install the correct browser launcher plugins
    browsers : ['PhantomJS'],

    // map of preprocessors that is used mostly for plugins
    preprocessors: {
      // 'app/partials/directives/*.html': 'html2js',
      // 'app/partials/*.html': 'html2js'
      
      // test coverage
      'app/js/controllers/*.js': ['jshint', 'coverage'],
      'app/js/directives/*.js': ['jshint', 'coverage'],
      'app/js/services/*.js': ['jshint', 'coverage'],
      'app/js/app.js': ['jshint', 'coverage']
    },

    //reporters: ['progress', 'coverage', 'dots', 'junit'],
      //singleRun = true,
    reporters : ['progress', 'coverage', 'dots', 'junit'],
      junitReporter : {
        outputDir: '', // results will be saved as $outputDir/$browserName.xml
        outputFile: '/junit.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
        suite: '', // suite will become the package name attribute in xml testsuite element
        useBrowserName: false // add browser name to report and classes names
    },

    // list of karma plugins
    plugins : [
      'karma-jshint-preprocessor',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-phantomjs-launcher',
      'karma-junit-reporter'
    ],

    // plugin settings
    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    },
    coverageReporter : {
    type: 'cobertura',
    dir: 'test-results/',
    file: 'coverage.xml'
  }
  //,
  //  junitReporter: {
  //    outputFile: 'test-results/junit-results.xml'
  //  }
})}
