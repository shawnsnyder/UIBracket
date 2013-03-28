
require.config({
    deps: ['../components/modernizr/modernizr', 'main'],
    paths: {
        jquery: '../components/jquery/jquery',
        lodash: '../components/lodash/lodash',
        bootstrap: 'vendor/bootstrap',
        backbone: '../components/backbone/backbone-min',
        layoutmanager: '../components/layoutmanager/backbone.layoutmanager'

    },
    map: {
    // Ensure Lo-Dash is used instead of underscore.
    "*": { "underscore": "lodash" }

    // Put additional maps here.
    },
    shim: {

        layoutmanager: {
            "deps": [
                "jquery",
                "backbone",
                "underscore"
            ],
            "exports": "Backbone.Layout"
        },


        backbone: {
          deps: ["underscore", "jquery"],
          exports: "Backbone"
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});


