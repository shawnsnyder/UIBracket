console.log 'require config is firing'
require.config
    deps: ["main", "client/cordova-2.5.0.js"]
    paths:
        jquery: "../components/jquery/jquery"
        #lodash: "../components/lodash/lodash"
        lodash: "../components/lodash/lodash.compat.min"
        bootstrap: "vendor/bootstrap"
        backbone: "../components/backbone/backbone-min"
        layoutmanager: "../components/layoutmanager/backbone.layoutmanager"
        socketio: "../components/socket.io-client/dist/socket.io"
        backboneredis: "../components/backbone-redis/backbone.redis"
         
    map:
        
        # Ensure Lo-Dash is used instead of underscore.
        "*":
            underscore: "lodash"


    
    # Put additional maps here.
    shim:
        layoutmanager:
            deps: ["jquery", "backbone", "underscore"]
            exports: "Backbone.Layout"

        backbone:
            deps: ["underscore", "jquery"]
            exports: "Backbone"

        backboneredis:
            deps:["backbone","underscore"]
            exports: "bbRedis"

        bootstrap:
            deps: ["jquery"]
            exports: "jquery"
            
        socketio:
            exports:'io'
