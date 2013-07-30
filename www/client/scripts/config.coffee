
require.config
    deps: ["main", "client/cordova-2.5.0.js"]
    paths:
        jquery: "../components/jquery/jquery"
        #lodash: "../components/lodash/lodash"
        underscore: "../components/underscore/underscore"
        lodash: "../components/lodash/lodash.compat.min"
        bootstrap: "vendor/bootstrap"
        backbone: "../components/backbone/backbone-min"
        layoutmanager: "../components/layoutmanager/backbone.layoutmanager"
        socketio: "../components/socket.io-client/dist/socket.io"
        backboneredis: "../components/backbone-redis/backbone.redis"
        nl:"../components/nlform/nlform"
         



    
    # Put additional maps here.
    shim:


        backbone:
            deps: ["underscore", "jquery"]
            exports: "Backbone"

        layoutmanager:
            deps: ["jquery", "backbone", "underscore"]
            exports: "Backbone.Layout"

        backboneredis:
            deps:["backbone","underscore"]
            exports: "bbRedis"

        bootstrap:
            deps: ["jquery"]
            exports: "jquery"

        socketio:
            exports:'io'

        nl:
            exports:'NLForm'

