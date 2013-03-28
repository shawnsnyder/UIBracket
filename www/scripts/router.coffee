
# Application.
define ["app"], (app) ->
  
  # Defining the application router, you can attach sub routers here.
  Router = Backbone.Router.extend(
    routes:
      "": "index"
      "screen":"screen"
      "screen/":"screen"

    index: ->
      console.log 'sumo'
    screen: ->
    	console.log ('bigshit')
      
    initialize: () ->
      app.useLayout
        el: '#main'
        template: 'layouts/main-layout'
      .render()
      console.log 'please!'
  )
  Router

