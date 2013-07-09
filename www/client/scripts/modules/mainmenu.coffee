define [
    'jquery'
    'app'
    'backbone'
], ($, app, Backbone ) ->
    MainmenuModule = app.module()
    MainmenuModule.newGameModel = Backbone.Model.extend
        defaults: ->
            name: ''
        url: '/creategame'

    MainmenuModule.Views.Main = Backbone.View.extend 
        template: 'mainmenu'     
    MainmenuModule.Views.Creategame = Backbone.View.extend 
        template: 'creategame' 
        events:
            'click .create': 'create'
        create: (event) ->
            event.preventDefault()
            event.stopPropagation()
            gamename = $('.gamename-input').val()
            console.log(gamename)
            newGame = new MainmenuModule.newGameModel
            newGame.set('gameid', new Date().getTime());
            
            newGame.set('name', gamename)
            
            newGame.save {} ,
                success:=>
                    console.log('i guess that worked')
                    console.log(newGame)
    MainmenuModule