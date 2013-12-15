
# Application.
define [
  "app"
  "modules/mainmenu"

], (app, MainmenuModule) ->
  
  # Defining the application router, you can attach sub routers here.
  Router = Backbone.Router.extend(
    routes:
      "": "index"
      "creategame":"creategame"
      "joingame":"joingame"
      "test":"test"

    index: ->
      app.layout.setView '.container', @.views['mainmenu']
      @.views['mainmenu'].render()

    creategame: ->
      console.log 'here'
      app.layout.setView '.container', @views.creategame
      @views.creategame.render()
      return

    test: ->
      console.log 'test'
      app.layout.setView '.container', @views.test
      @views.test.render()
      return
      
    initialize: (options) ->
      app.useLayout
        el: '#main'
        template: 'layouts/main-layout'
      .render().then options.init

      
      mainmenu = new MainmenuModule.Views.Main
      creategame = new MainmenuModule.Views.Creategame
      test = new MainmenuModule.Views.Test
      #joingame =  new MainmenuModule.Views.Main
      @views =
        mainmenu: mainmenu
        creategame: creategame
        test: test

        #joingame: joingame
  )
  Router

