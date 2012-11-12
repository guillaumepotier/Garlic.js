"use strict";

var testSuite = function () {
  describe ( 'Garlic.js test suite', function () {
    $('[rel=persist-select]').garlic({inputs: 'input:text, textarea, select', debug: true});
    $('#form1').garlic();

    describe ( 'Test getPath', function () {
      it ( 'getPath() for #input1', function () {
        expect( $("#input1").getPath() ).to.be( 'garlic:' + document.domain + '>' + 'form:eq(0)>input' );
      } )
      it ( 'getPath() for #div1', function () {
        expect( $("#div1").getPath() ).to.be( 'garlic:' + document.domain + '>' + 'div:eq(1)>div' );
      } )
      it ( 'getPath() for #textarea2', function () {
        expect( $("#textarea2").getPath() ).to.be( 'garlic:' + document.domain + '>' + 'form:eq(6)>textarea' );
      } )
    } )

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
      it ( 'On a form without data-persist, binded manually in javascript', function () {
        expect( $("#input5").hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
    } )

    describe ( 'Test inputs events', function () {
      var events = [ 'DOMAttrModified', 'textInput', 'input', 'change', 'keypress', 'paste', 'focus' ]
        , fieldPath = $("#input6").getPath();

      for ( var event in events ) {
        it ( 'Letters are persisted on ' + events[event] + 'event', function () {
          $('#input6').val( 'foo' +  events[event] );
          $('#input6').trigger( $.Event( events[event] ) );
          expect( $("#input6").val() ).to.be( 'foo' +  events[event] );
          expect( garlicStorage.get( fieldPath ) ).to.be( 'foo' +  events[event] );
        } )
      }
    } )

    describe ( 'Test input data retrieving', function () {
      it ( 'An input should be populated by its stored data', function () {
        garlicStorage.set( $("#input7").getPath(), 'foo' );
        garlicStorage.set( $("#textarea2").getPath(), 'bar' );
        expect( $("#input7").val() ).to.be( 'foo' );
        expect( $("#textarea2").val() ).to.be( 'bar' );
      } )
    } )

    describe ( 'Test input data destroy', function () {
      it ( 'Reset button should remove both text and localStorage, but only on current form', function () {
        garlicStorage.set( $("#input8").getPath(), 'foo' );
        garlicStorage.set( $("#input9").getPath(), 'foo' );
        expect( garlicStorage.get( $("#input8").getPath() ) ).to.be( 'foo' );
        expect( garlicStorage.get( $("#input9").getPath() ) ).to.be( 'foo' );
        
        $('#reset1').click( function () {
          expect( $("#input9").val() ).to.be( '' );
          expect( $("#input8").val() ).to.be( 'foo' );
          expect( garlicStorage.has( $("#input8").getPath() ) ).to.be( false );
          expect( garlicStorage.get( $("#input9").getPath() ) ).to.be( 'foo' );
        });
      } )
      it ( 'Same behavior for submit button' )
      it ( 'Destroy localStorage when garlic(\'destroy\') is fired on an elem', function () {
        garlicStorage.set( $("#input10").getPath(), 'foo' );
        expect( garlicStorage.get( $("#input10").getPath() ) ).to.be( 'foo' );
        $("#input10").garlic('destroy');
        expect( garlicStorage.has( $("#input10").getPath() ) ).to.be( false );
      } )
    } )
  } )
}
