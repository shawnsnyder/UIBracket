define [
    'jquery'
    'app'
    'backbone'
], ($, app, Backbone ) ->
    MainmenuModule = app.module()
    MainmenuModule.Views.Main = Backbone.View.extend 
        template: 'mainmenu' 
    MainmenuModule