require.config
    deps: ["../components/modernizr/modernizr", "main", "cordova-2.5.0.js"]
    paths:
        jquery: "../components/jquery/jquery"
        lodash: "../components/lodash/lodash"
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
            exports: "Backbone"

        bootstrap:
            deps: ["jquery"]
            exports: "jquery"