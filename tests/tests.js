"use strict";

var testSuite = function () {
  describe ( 'Garlic.js test suite', function () {
    $('[rel=persist-select]').garlic({inputs: 'input:text, textarea, select', debug: true});

    describe ( 'Test getPath', function () {
      it ( 'getPath()', function () {
        expect( $("#input1").getPath() ).to.be( 'garlic:' + document.domain + '>' + 'html>body>div:eq(1)>form:eq(0)>input' );
      } )
    } )

    garlicStorage.clear();
    describe ( 'Test Garlic storage', function () {
      it ( 'Test has()', function () {
        expect( garlicStorage.has('foo') ).to.be( false );
      } )
      it ( 'Test set()', function () {
        garlicStorage.set( 'foo', 'bar' );
        garlicStorage.set( 'garlic', 'storage' );
        expect( garlicStorage.has( 'foo' ) ).to.be( true );
        expect( garlicStorage.has( 'garlic' ) ).to.be( true );
      } )
      it ( 'Test get()', function () {
        expect( garlicStorage.get( 'foo') ).to.be( 'bar' );
        expect( garlicStorage.get( 'baz') ).to.be( null );
        expect( garlicStorage.get( 'garlic' ) ).to.be( 'storage' );
        expect( garlicStorage.get( 'baz', 'bar') ).to.be( 'bar' );
      } )
      it ( 'Test destroy()', function () {
        garlicStorage.destroy( 'foo' );
        expect( garlicStorage.get( 'foo' ) ).to.be( null );
      } )
      it ( 'Test clear()', function () {
        garlicStorage.clear();
        expect( garlicStorage.get( 'garlic' ) ).to.be( null );
      } )
      it ( 'Test clean()', function () {
        garlicStorage.set( 'garlic:test1', 'bar' );
        garlicStorage.set( 'garlic:test2', 'bar' );
        garlicStorage.set( 'test3', 'bar' );
        garlicStorage.clean();
        expect( garlicStorage.get( 'garlic:test1' ) ).to.be( null );
        expect( garlicStorage.get( 'garlic:test2' ) ).to.be( null );
        expect( garlicStorage.get( 'test3' ) ).to.be( 'bar' );
      } )
    } )

    garlicStorage.clear();
    describe ( 'Test forms initialisation', function () {
      it ( 'On a simple form with only one input:text', function () {
        expect( $("#input1").hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a simple form with only one input:text and a textarea', function () {
        expect( $("#input2").hasClass( 'garlic-auto-save' ) ).to.be( true );
        expect( $("#textarea1").hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a div which is obviously not a form', function () {
        expect( $("#div1").hasClass( 'garlic-auto-save' ) ).to.be( false );
      } )
      it ( 'On a single form element, not the wole form', function () {
        expect( $("#input3").hasClass( 'garlic-auto-save' ) ).to.be( true );
        expect( $("#input4").hasClass( 'garlic-auto-save' ) ).to.be( false );
      } )
      it ( 'On a select input on default configuration: non persistency', function () {
        expect( $("#select1").hasClass( 'garlic-auto-save' ) ).to.be( false );
      } )
      it ( 'On a select input on extended configuration with select persistency', function () {
        expect( $("#select2").hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
    } )

    garlicStorage.clear();
    describe ( 'Test inputs events', function () {
      var events = [ 'DOMAttrModified', 'textInput', 'input', 'change', 'keypress', 'paste', 'focus' ]
          , fieldPath = $("#testEvents").getPath();

      for ( var event in events ) {
        it ( 'Letters are persisted on ' + events[event] + 'event', function () {
          $('#testEvents').val( 'foo' +  events[event] );
          $('#testEvents').trigger( $.Event( events[event] ) );
          expect( $("#testEvents").val() ).to.be( 'foo' +  events[event] );
          expect( garlicStorage.get( fieldPath ) ).to.be( 'foo' +  events[event] );
        } )
      }
    } )
  } )
}