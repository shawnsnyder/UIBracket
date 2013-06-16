
# Application.
define ["app"], (app) ->
  
  # Defining the application router, you can attach sub routers here.
  Router = Backbone.Router.extend(
    routes:
      "": "index"
      "screen":"screen"


    index: ->

    screen: ->
    	console.log ('poo')
      
    initialize: () ->
      app.useLayout
        el: '#main'
        template: 'layouts/main-layout'
      .render()



  )
  Router

