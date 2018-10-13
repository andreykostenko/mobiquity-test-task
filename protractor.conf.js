((g) => {
    'use strict';


// An example configuration file
    exports.config = {

        // The address of a running selenium server.
        //seleniumAddress: 'http://localhost:4444/wd/hub',

        // Capabilities to be passed to the webdriver instance.
        capabilities: {
            browserName: 'chrome'
        },
        directConnect: 'true',

        specs: ['spec/*spec'],

        // Options to be passed to Jasmine-node.
        jasmineNodeOpts: {
            showColors: true, // Use colors in the command line report.
        }
    };
    g.hostname = 'http://cafetownsend-angular-rails.herokuapp.com/login';


})(global);
