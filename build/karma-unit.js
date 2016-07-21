module.exports = function ( karma ) {
  karma.set({
    /** 
     * From where to look for files, starting with the location of this file.
     */
    basePath: '../',

    /**
     * This is the list of file patterns to load into the browser during testing.
     */
    files: [
      'vendor/angular/angular.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-route/angular-route.js',
      'vendor/angular-resource/angular-resource.js',
      'vendor/angular-aria/angular-aria.js',
      'vendor/angular-animate/angular-animate.js',
      'vendor/angular-material/angular-material.js',
      'vendor/angularjs-slider/dist/rzslider.min.js',
      'vendor/jquery/dist/jquery.min.js',
      'vendor/bootstrap/dist/js/bootstrap.min.js',
      'vendor/highcharts/highcharts.js',
      'vendor/highcharts/highcharts-3d.js',
      'vendor/metisMenu/dist/metisMenu.js',
      'vendor/owl.carousel/dist/owl.carousel.min.js',
      'vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
      'vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
      'build/templates-app.js',
      'build/templates-common.js',
      'vendor/angular-mocks/angular-mocks.js',
      
      'src/common/**/*.js',
      'src/app/**/*.module.js',
      'src/app/**/*.service.js',
      'src/app/**/*.controller.js',
      'src/app/app.js',
      'src/app/config.js',
      'src/components/**/*.js',
      'src/**/Test/**/*.spec.js',
    ],
    exclude: [
      'src/assets/**/*.js'
    ],
    frameworks: [ 'jasmine' ],
    plugins: [ 'karma-jasmine', 'karma-firefox-launcher'],

    /**
     * How to report, by default.
     */
    reporters: 'dots',

    /**
     * On which port should the browser connect, on which port is the test runner
     * operating, and what is the URL path for the browser to use.
     */
    port: 9018,
    runnerPort: 9100,
    urlRoot: '/',

    /** 
     * Disable file watching by default.
     */
    autoWatch: false,

    /**
     * The list of browsers to launch to test on. This includes only "Firefox" by
     * default, but other browser names include:
     * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
     *
     * Note that you can also use the executable name of the browser, like "chromium"
     * or "firefox", but that these vary based on your operating system.
     *
     * You may also leave this blank and manually navigate your browser to
     * http://localhost:9018/ when you're running tests. The window/tab can be left
     * open and the tests will automatically occur there during the build. This has
     * the aesthetic advantage of not launching a browser every time you save.
     */
    browsers: [
      'Firefox'
    ]
  });
};

