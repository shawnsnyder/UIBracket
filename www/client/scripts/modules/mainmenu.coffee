define [
    'jquery'
    'app'
    'backbone'
], ($, app, Backbone ) ->
    MainmenuModule = app.module()
    MainmenuModule.Views.Main = Backbone.View.extend 
        template: 'mainmenu'     
    MainmenuModule.Views.Creategame = Backbone.View.extend 
        template: 'creategame' 
        events:
            'click .create': 'create'
        create: (event) ->
            event.preventDefault()
            event.stopPropagation()
            console.log('working')
    MainmenuModule