/*
  Garlic.js allows you to automatically persist your forms' text field values locally,
  until the form is submitted. This way, your users don't lose any precious data if they
  accidentally close their tab or browser.

  author: Guillaume Potier - @guillaumepotier
*/

!function ($) {

  "use strict";
  /*global localStorage */
  /*global document */

  /* STORAGE PUBLIC CLASS DEFINITION
   * =============================== */
  var Storage = function () {
    this.defined = 'undefined' !== typeof localStorage ? true : false;
  }

  Storage.prototype = {

    constructor: Storage

    , get: function ( key, placeholder ) {
      return localStorage.getItem( key ) ? localStorage.getItem( key ) : 'undefined' !== typeof placeholder ? placeholder : null;
    }

    , has: function ( key ) {
      return localStorage.getItem( key ) ? true : false;
    }

    , set: function ( key, value ) {
      localStorage.setItem( key , value );
      return true;
    }

    , destroy: function ( key ) {
      localStorage.removeItem( key );
      return true;
    }

    , clean: function () {
      for ( var i = localStorage.length - 1; i >= 0; i-- ) {
        if ( -1 !== localStorage.key(i).indexOf( 'garlic:' ) ) {
          localStorage.removeItem( localStorage.key(i) );
        }
      }

      return true;
    }

    , clear: function () {
      localStorage.clear();
    }
  }

 /* GARLIC PUBLIC CLASS DEFINITION
  * =============================== */

  var Garlic = function ( element, storage, options ) {
    this.init( 'garlic', element, storage, options );
  }

  Garlic.prototype = {

    constructor: Garlic

    , init: function ( type, element, storage, options ) {
      this.type = type;
      this.$element = $( element );
      this.options = this.getOptions( options );
      this.storage = storage;
      this.path = this.$element.getPath();

      // garlic only apply to form elements!
      if ( !this.$element.context.form ) {
        return;
      }

      this.retrieve();

      this.$element.on( this.options.events.join( '.' + this.type + ' ') , false, $.proxy( this.persist, this ) );
      this.$element.closest( 'form' ).on( 'submit' , false, $.proxy( this.destroy, this ) );
      this.$element.addClass('garlic-auto-save');
    }

    , getOptions: function ( options ) {
      options = $.extend( {}, $.fn[this.type].defaults, options, this.$element.data() );

      return options;
    }

    , persist: function () {
      if ( this.options.storage ) {
        this.storage.set( this.path , this.$element.context.value );
      }
    }

    , retrieve: function () {
      if ( this.storage.has( this.path ) ) {
        this.$element.val( this.storage.get( this.path ) );
      }
    }

    // only delete localStorage
    , destroy: function () {
      this.storage.destroy( this.path );
    }

    // remove content and delete localStorage
    , remove: function () {
      this.remove();
      this.$element.val( '' );
    }
  }

  /*  GETPATH IMPLEMENTATION
     get unique elem selector
  * ========================= */

  $.fn.getPath = function () {

    // Requires one element.
    if ( this.length != 1 ) {
      return false;
    }

    var path
      , node = this;

    while ( node.length ) {
      var realNode = node[0]
        , name = realNode.localName;

      if ( !name ) {
        break;
      }

      name = name.toLowerCase();

      var parent = node.parent()
        , siblings = parent.children(name);

      if ( siblings.length > 1 ) { 
          name += ':eq(' + siblings.index(realNode) + ')';
      }

      path = name + ( path ? '>' + path : '' );
      node = parent;
    }

    return 'garlic:' + document.domain + '>' + path;
  }

  /* GARLIC PLUGIN DEFINITION
  * ========================= */

  $.fn.garlic = function ( option ) {
    var options = $.extend( {}, $.fn.garlic.defaults, option, this.data() );

    var storage = new Storage();

    /* this plugin heavily rely on local Storage.
       If there is no localstorage, just stop here */
    if ( !storage.defined ) {
      return false;
    }

    // access Garlic storage in debug mode for debugging purpose
    if ( options.debug ) {
      window.garlicStorage = storage;
    }

    function bind (self) {
      var $this = $( self )
        , data = $this.data( 'garlic' );

      if ( !data ) {
        $this.data( 'garlic', ( data = new Garlic( self, storage, options ) ) );
      }

      if ( typeof option == 'string' && typeof data[option] !== 'undefined' ) {
        data[option]();
      }
    }

    // loop through every elemt we want to garlic
    return this.each(function () {
      var self = this;

      // if a form elem is given, bind all its input children
      if ( $( this ).is( 'form' ) ) {

        $( this ).find( options.inputs ).each( function () {
          bind( $( this ) );
        });
      }

      // if it is a Garlic supported single element, bind it too
      if ( $( this ).is( config.supportedInputs ) ) {
        bind( $( this ) );
      }
    });
  }

  $.fn.garlic.Constructor = Garlic;

  var config = {
      supportedInputs: 'input:text, textarea, select'
  }

  $.fn.garlic.defaults = {
      debug: false                        // In debug mode, storage is available though window.garlicStorage
    , storage: true                       // Allows to disable storage on the go for fields with data-storage="false"
    , inputs: 'input:text, textarea'      // Default supported inputs. See config.supportedInputs
    , events: [ 'DOMAttrModified', 'textInput', 'input', 'change', 'keypress', 'paste', 'focus' ] // events list that trigger a localStorage
  }

}(window.jQuery);
