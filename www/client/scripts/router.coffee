
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

    index: ->
      app.layout.setView '.main', @.views['mainmenu']
      @.views['mainmenu'].render()

    creategame: ->
      app.layout.setView '.main', @.views['creategame']
      @.views['creategame'].render()
      
    initialize: () ->
      app.useLayout
        el: '#main'
        template: 'layouts/main-layout'
      .render()

      mainmenu =  new MainmenuModule.Views.Main
      creategame =  new MainmenuModule.Views.Creategame
      #joingame =  new MainmenuModule.Views.Main
      @.views =
        mainmenu: mainmenu
        creategame: creategame
        #joingame: joingame
  )
  Router

