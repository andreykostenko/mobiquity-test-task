((g) => {
    'use strict';
    g.moment = require('moment');


    exports.config = {

        onPrepare: function () {
            var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
            jasmine.getEnv().addReporter(
                new Jasmine2HtmlReporter({
                    savePath: 'Report'
                })
            );
        },


        // The address of a running selenium server.
        //seleniumAddress: 'http://localhost:4444/wd/hub', Since directConnect is set to true, we don't use it
        capabilities: {
            browserName: 'chrome'
        },
        directConnect: 'true',

        specs: ['spec/*spec.js'],

        // Options to be passed to Jasmine-node.
        jasmineNodeOpts: {
            showColors: true, // Use colors in the command line report.
        },

    };
    g.hostname = 'http://cafetownsend-angular-rails.herokuapp.com/login';


})(global);
