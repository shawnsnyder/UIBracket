define [
    'jquery'
    'app'
    'backbone'
    'nl'
], ($, app, Backbone, nl ) ->
    MainmenuModule = app.module()
    MainmenuModule.game = Backbone.Model.extend
        defaults: ->
            name: ''
            boogie: 'vfvfvfv'
        url  : 'games',
        type : 'game',
        sync : _.sync,
  

    MainmenuModule.games = Backbone.Collection.extend


        #Server communication settings
        #Save all of the todo items under the `"todos"` namespace.
        url  : 'games'
        type : 'game'
        sync : _.sync,

        nextOrder: ()-> 
            if !@.length 
                return 1;
            else 
                return @.last().get('order') + 1;

    MainmenuModule.Views.Main = Backbone.View.extend
        template: 'mainmenu'     
    MainmenuModule.Views.Creategame = Backbone.View.extend
        template: 'Creategame' 
        events:
            'click .create': 'create'
        serialize: ->
            data: null
        create: (event) ->
            event.preventDefault()
            event.stopPropagation()
            gamename = $('.gamename-input').val()
            console.log(gamename)
            newGame = new MainmenuModule.game
            newGame.set('gameid', new Date().getTime());
            newGame.set('name', gamename)
            
            newGame.save {} ,
                success:=>
                    console.log('i guess that workedd')

                    console.log(newGame)
            return
        beforeRender: ->
            console.log 'before render!'
            return
        afterRender: ->
            console.log 'bs2!'
            nlform = new window.NLForm( document.getElementById( 'nl-form' ) );
            return

    MainmenuModule