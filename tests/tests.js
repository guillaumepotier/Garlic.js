"use strict";

var testSuite = function () {
  describe ( 'Garlic.js test suite', function () {
    $('[rel=persist-select]').garlic({debug: true});
    $('#form1').garlic();

    /***************************************
                     getPath
    ***************************************/
    describe ( 'Test getPath', function () {
      it ( 'getPath() for #input1', function () {
        expect( $("#input1").garlic( 'getPath' ) ).to.be( 'garlic:' + document.domain + window.location.pathname + '>' + 'form:eq(0)>input' );
      } )
      it ( 'getPath() for #div1', function () {
        expect( $("#div1").garlic( 'getPath' ) ).to.be( false );
      } )
      it ( 'getPath() for #textarea2', function () {
        expect( $("#textarea2").garlic( 'getPath' ) ).to.be( 'garlic:' + document.domain + window.location.pathname + '>' + 'form:eq(8)>textarea' );
      } )
      it ( 'getPath() for #checkbox1', function () {
        expect( $("#checkbox1").garlic( 'getPath' ) ).to.be( 'garlic:' + document.domain + window.location.pathname + '>' + 'form:eq(3)>input.checkbox[]:eq(0)' );
      } )
      it ( 'getPath() for #checkbox2', function () {
        expect( $("#checkbox2").garlic( 'getPath' ) ).to.be( 'garlic:' + document.domain + window.location.pathname + '>' + 'form:eq(3)>input.checkbox[]:eq(1)' );
      } )
      it ( 'getPath() for #radio1', function () {
        expect( $("#radio1").garlic( 'getPath' ) ).to.be( 'garlic:' + document.domain + window.location.pathname + '>' + 'form:eq(4)>input.radio' );
      } )
      it ( 'getPath() for #radio2, should be same as #radio1', function () {
        expect( $("#radio1").garlic( 'getPath' ) ).to.be( $("#radio1").garlic( 'getPath' ) );
      } )
    } )

    /***************************************
                garlicStorage
    ***************************************/
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
      it ( 'Test clean(), at the end of the test suite' )
      it ( 'Test clear(), at the end of the test suite' )
    } )

    /***************************************
                inputs binding
    ***************************************/
    describe ( 'Test inputs binding', function () {
      it ( 'On a simple form with only one input[type=text]', function () {
        expect( $("#input1").hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a simple form with only one input[type=text] and a textarea', function () {
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
      it ( 'On a select input', function () {
        expect( $("#select2").hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a checkboxes inputs', function () {
        expect( $("#checkbox1").hasClass( 'garlic-auto-save' ) ).to.be( true );
        expect( $("#checkbox2").hasClass( 'garlic-auto-save' ) ).to.be( true );
        expect( $("#checkbox3").hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a radio buttons', function () {
        expect( $("#radio1").hasClass( 'garlic-auto-save' ) ).to.be( true );
        expect( $("#radio2").hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a form without data-persist, binded manually in javascript', function () {
        expect( $("#input5").hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
    } )

    /***************************************
                trigger events
    ***************************************/
    describe ( 'Test inputs events', function () {
      var events = [ 'DOMAttrModified', 'textInput', 'input', 'change', 'keypress', 'paste', 'focus' ]
        , fieldPath = $("#input6").garlic( 'getPath' );

      for ( var event in events ) {
        it ( 'Data is persisted on ' + events[event] + 'event', function () {
          $('#input6').val( 'foo' +  events[event] );
          $('#input6').trigger( $.Event( events[event] ) );
          expect( $("#input6").val() ).to.be( 'foo' +  events[event] );
          expect( garlicStorage.get( fieldPath ) ).to.be( 'foo' +  events[event] );
        } )
      }
    } )

    /***************************************
              input data retrieving
    ***************************************/
    describe ( 'Test input data retrieving', function () {
      garlicStorage.set( $("#input7").garlic( 'getPath' ), 'foo' );
      garlicStorage.set( $("#textarea2").garlic( 'getPath' ), 'bar' );
      garlicStorage.set( $("#radio1").garlic( 'getPath' ), 'radio1' );
      garlicStorage.set( $("#checkbox1").garlic( 'getPath' ), 'checkbox1' );
      garlicStorage.set( $("#checkbox2").garlic( 'getPath' ), 'checkbox2' );
      garlicStorage.set( $("#checkbox3").garlic( 'getPath' ), 'wrong_data' );

      it ( 'An input should be populated by its stored data', function () {
        $("#input7").garlic ( 'retrieve' );
        $("#textarea2").garlic ( 'retrieve' );
        expect( $("#input7").val() ).to.be( 'foo' );
        expect( $("#textarea2").val() ).to.be( 'bar' );
      } )
      it ( 'Select must be setted accordingly to storage' )
      it ( 'Radio buttons must be checked accordingly to storage', function () {
        $("#radio1").garlic ( 'retrieve' );
        $("#radio2").garlic ( 'retrieve' );
        expect( $("#radio1").attr( 'checked' ) ).to.be( 'checked' );
        expect( $("#radio2").attr( 'checked' ) == undefined || $("#radio2").attr( 'checked' ) == false ).to.be( true );
      } )
      it ( 'Checkboxes buttons must be checked accordingly to storage', function () {
        $("#checkbox1").garlic ( 'retrieve' );
        $("#checkbox2").garlic ( 'retrieve' );
        $("#checkbox3").garlic ( 'retrieve' );
        expect( $("#checkbox1").attr( 'checked' ) ).to.be( 'checked' );
        expect( $("#checkbox2").attr( 'checked' ) ).to.be( 'checked' );
        expect( $("#checkbox3").attr( 'checked' ) == undefined || $("#checkbox3").attr( 'checked' ) == false ).to.be( true );
      } )
    } )

    /***************************************
               change input states
    ***************************************/
    describe ( 'Test input data change', function () {
      it ( 'If some text is added / removed in a textarea or an input[type=text], it should be updated in storage' )
      it ( 'If a select is changed, new value should be stored' )
      it ( 'If radio button is selected, value or new value should be stored' )
      it ( 'Same, but with radio buttons not at the same DOM level' )
      it ( 'If a checkbox is checked, its state should be persisted' )
      it ( 'Same, but with checkboxes not at the same DOM level' )
      it ( 'If a checkbox is unchecked, its state should be removed from storage' )
    } )

    /***************************************
                destroy data
    ***************************************/
    describe ( 'Test input data destroy', function () {
      it ( 'Reset button should remove both text and localStorage, but only on current form, with input[type=text] and textarea', function () {
        garlicStorage.set( $("#input8").garlic( 'getPath' ), 'foo' );
        garlicStorage.set( $("#input9").garlic( 'getPath' ), 'foo' );
        expect( garlicStorage.get( $("#input8").garlic( 'getPath' ) ) ).to.be( 'foo' );
        expect( garlicStorage.get( $("#input9").garlic( 'getPath' ) ) ).to.be( 'foo' );
        
        $('#reset1').click( function () {
          expect( $("#input9").val() ).to.be( '' );
          expect( $("#input8").val() ).to.be( 'foo' );
          expect( garlicStorage.has( $("#input8").garlic( 'getPath' ) ) ).to.be( false );
          expect( garlicStorage.get( $("#input9").garlic( 'getPath' ) ) ).to.be( 'foo' );
        });
      } )
      it ( 'Same behavior for radio buttons, remove stored state and uncheck the checked one' )
      it ( 'Same behavior for checkboxes, remove stored states and uncheck the checked ones' )
      it ( 'Same behavior for all fields for submit button' )
      it ( 'Destroy localStorage when garlic(\'destroy\') is fired on an elem', function () {
        garlicStorage.set( $("#input10").garlic( 'getPath' ), 'foo' );
        expect( garlicStorage.get( $("#input10").garlic( 'getPath' ) ) ).to.be( 'foo' );
        $("#input10").garlic('destroy');
        expect( garlicStorage.has( $("#input10").garlic( 'getPath' ) ) ).to.be( false );
      } )
    } )

    /***************************************
                  End tests
    ***************************************/
    // these tests must remain here because they clear all localStorage and could make conflicts with the above ones..
    describe ( 'Final tests that clean/clear localStorage', function () {
      it ( 'Test clean()', function () {
        garlicStorage.set( 'garlic:test1', 'bar' );
        garlicStorage.set( 'garlic:test2', 'bar' );
        garlicStorage.set( 'test3', 'bar' );
        garlicStorage.clean();
        expect( garlicStorage.get( 'garlic:test1' ) ).to.be( null );
        expect( garlicStorage.get( 'garlic:test2' ) ).to.be( null );
        expect( garlicStorage.get( 'test3' ) ).to.be( 'bar' );
      } )
      it ( 'Test clear()', function () {
        garlicStorage.clear();
        expect( garlicStorage.get( 'garlic' ) ).to.be( null );
      } )
    } )
  } )
}
