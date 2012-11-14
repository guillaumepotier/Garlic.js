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

    , set: function ( key, value, fn ) {
      localStorage.setItem( key , value );
      return 'function' === typeof fn ? fn() : true;
    }

    , destroy: function ( key, fn ) {
      localStorage.removeItem( key );
      return 'function' === typeof fn ? fn() : true;
    }

    , clean: function ( fn ) {
      for ( var i = localStorage.length - 1; i >= 0; i-- ) {
        if ( -1 !== localStorage.key(i).indexOf( 'garlic:' ) ) {
          localStorage.removeItem( localStorage.key(i) );
        }
      }

      return 'function' === typeof fn ? fn() : true;
    }

    , clear: function ( fn ) {
      localStorage.clear();
      return 'function' === typeof fn ? fn() : true;
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

      this.retrieve();

      this.$element.on( this.options.events.join( '.' + this.type + ' ') , false, $.proxy( this.persist, this ) );
      this.$element.closest( 'form' ).on( 'submit reset' , false, $.proxy( this.destroy, this ) );

      this.$element.addClass('garlic-auto-save');
    }

    , getOptions: function ( options ) {
      options = $.extend( {}, $.fn[this.type].defaults, options, this.$element.data() );

      return options;
    }

    , persist: function () {
      if ( this.options.storage ) {
        // for checkboxes, we need to implement a kind of toggle
        if ( this.$element.is( 'input[type=checkbox]' ) && this.storage.has( this.path )) {
          this.destroy();
          return;
        }

        this.storage.set( this.path , this.$element.val() );
      }
    }

    , retrieve: function () {
      if ( this.storage.has( this.path ) ) {
        if ( this.$element.is( 'input[type=radio], input[type=checkbox]' ) ) {
          if ( this.storage.get( this.path ) === this.$element.val() ) {
            this.$element.attr( 'checked', 'checked' );
          }

          return;
        }

        this.$element.val( this.storage.get( this.path ) );
      }
    }

    // only delete localStorage
    , destroy: function () {
      if ( this.$element.is( 'input[type=radio], input[type=checkbox]' ) ) {
        this.$element.attr( 'checked', false );
      }

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

      if ( !name || 'body' == name ) {
        break;
      }

      name = name.toLowerCase();

      var parent = node.parent()
        , siblings = parent.children(name);

      // if has sibilings, get eq(), exept for radio buttons, get name instead to group them by name
      if ( siblings.length > 1 && !$( realNode ).is( 'input[type=radio]' ) ) {
        name += ':eq(' + siblings.index( realNode ) + ')';
      } else if ( $( realNode ).is( 'input[type=radio]' ) ) {
        name += '#' + $( realNode ).attr( 'name' );
      }

      path = name + ( path ? '>' + path : '' );

      // break once we came up to form:eq(x), no need to go further
      if ( 'form' == realNode.localName ) {
        break;
      }

      node = parent;
    }

    return 'garlic:' + document.domain + '>' + path;
  }

  /* GARLIC PLUGIN DEFINITION
  * ========================= */

  $.fn.garlic = function ( option ) {
    var options = $.extend( {}, $.fn.garlic.defaults, option, this.data() )
      , storage = new Storage();

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

      // if it is a Garlic supported single element, bind it too
      } else if ( $( this ).is( options.inputs ) ) {
        bind( $( this ) );
      }
    });
  }

  /* GARLIC CONFIGS & OPTIONS
  * ========================= */

  $.fn.garlic.Constructor = Garlic;

  $.fn.garlic.defaults = {
      debug: false                              // In debug mode, storage is available though window.garlicStorage
    , storage: true                             // Allows to disable storage on the go for fields with data-storage="false"
    , inputs: 'input[type=text], input[type=radio], input[type=checkbox], textarea, select'               // Default supported inputs. See config.supportedInputs
    , events: [ 'DOMAttrModified', 'textInput', 'input', 'change', 'keypress', 'paste', 'focus' ] // events list that trigger a localStorage
  }

  /* GARLIC DATA-API
  * =============== */
  $( window ).on( 'load', function () {
    $( '[data-persist="garlic"]' ).each( function () {
      $(this).garlic();
    })
  })

// This plugin works with jQuery or Zepto (with data extension builded for Zepto. See changelog 0.0.6)
}(window.jQuery || Zepto);
