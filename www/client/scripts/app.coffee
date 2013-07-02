
# Include additional libraries installed with JamJS or placed in the
# `vendor/js` directory, here.
define ["layoutmanager"], (LayoutManager) ->
  
  # Provide a global location to place configuration settings and module
  # creation.
  
  # The root path to run the application.
  app = root: "/"

  
  # Localize or create a new JavaScript Template object.
  JST = window.JST = window.JST or {}
  
  # Configure LayoutManager with Backbone Boilerplate defaults.
  LayoutManager.configure
    
    # Allow LayoutManager to augment Backbone.View.prototype.
    manage: true
    prefix: "scripts/templates/"
    fetch: (path) ->
      
      # Concatenate the file extension.
      path = path + ".html"
      
      # If cached, use the compiled template.
      return JST[path]  if JST[path]
      
      # Put fetch into `async-mode`.
      done = @async()
      
      # Seek out the template asynchronously.
      $.get app.root + path, ((contents) ->
        done _.template(contents)
      ), "text"

  
  # Mix Backbone.Events, modules, and layout management into the app object.
  _.extend app,  
        # Application Constructor
    initialize: ->
      @bindEvents()

    
    # Bind Event Listeners
    #
    # Bind any events that are required on startup. Common events are:
    # 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: ->
      document.addEventListener "deviceready", @onDeviceReady, false

    
    # deviceready Event Handler
    #
    # The scope of 'this' is the event. In order to call the 'receivedEvent'
    # function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: ->
      app.receivedEvent "deviceready"

    
    # Update DOM on a Received Event
    receivedEvent: (id) ->
      parentElement = document.getElementById(id)
      listeningElement = parentElement.querySelector(".listening")
      receivedElement = parentElement.querySelector(".received")
      listeningElement.setAttribute "style", "display:none;"
      receivedElement.setAttribute "style", "display:block;"
      console.log "Received Event: " + id


    # Create a custom object with a nested Views object.
    module: (additionalProps) ->
      _.extend
        Views: {}
      , additionalProps

    
    # Helper for using layouts.
    useLayout: (name, options) ->
      
      # Enable variable arity by allowing the first argument to be the options
      # object and omitting the name argument.
      options = name  if _.isObject(name)
      
      # Ensure options is an object.
      options = options or {}
      
      # If a name property was specified use that as the template.
      options.template = name  if _.isString(name)
      
      # Check if a layout already exists, if so, update the template.
      if @layout
        @layout.template = options.template
      else
        
        # Create a new Layout with options.
        @layout = new Backbone.Layout(_.extend(
          el: "main"
        , options))
      
      # Cache the reference.
      @layout
  , Backbone.Events

  ##########cordova 



