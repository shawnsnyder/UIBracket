
# Application.
define [
  "app"
  "modules/mainmenu"

], (app, MainmenuModule) ->
  
  # Defining the application router, you can attach sub routers here.
  Router = Backbone.Router.extend(
    routes:
      "": "index"
      "screen":"screen"


    index: ->
      console.log('this is happening')
      menu =  new MainmenuModule.Views.Main
      app.layout.setView '.main', menu
      menu.render()
    screen: ->
    	console.log ('poo')
      
    initialize: () ->
      app.useLayout
        el: '#main'
        template: 'layouts/main-layout'
      .render()



  )
  Router

