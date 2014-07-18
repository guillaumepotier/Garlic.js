"use strict";

var testSuite = function () {
  describe ( 'Garlic.js test suite', function () {
    $( '#noGarlicDefault' ).garlic( { conflictManager: { enabled: true, garlicPriority: false } } );
    $( '[rel=persist-select]' ).garlic();
    $( '#submit13' ).click( function ( e ) {
      e.preventDefault();
    } );
    $( '#form1' ).garlic( { domain: true } );
    $( '#retrieve-trigger' ).garlic( { onRetrieve: function ( elem, retrieveVal ) {
      elem.attr( 'storedValue', retrieveVal );
    } } );
    $( '#persist-trigger' ).garlic( { onPersist: function ( elem, persistVal ) {
      console.log("Value: ", persistVal);
      elem.attr( 'storedValue', persistVal );
    } } );
    var garlicStorage = $( '#form1' ).garlic( 'getStorage' );

    $( '#custom-get-path-form' ).garlic( {
      getPath: function ($elem ) {
        return $elem.attr( 'id' ) + '_mypath' ;
      }
    } );

    $( '#conflictedForm' ).garlic( { conflictManager: { enabled: true } } );

    /***************************************
                     getPath
    ***************************************/
    describe ( 'Test getPath', function () {
      it ( 'getPath() for #input1', function () {
        expect( $( '#input1' ).garlic( 'getPath' ) ).to.be( 'garlic:' + document.domain + window.location.pathname + '>' + 'form:eq(0)>input' );
      } )
      it ( 'getPath() for #div1', function () {
        expect( $( '#div1' ).garlic( 'getPath' ) ).to.be( false );
      } )
      it ( 'getPath() for #textarea2', function () {
        expect( $( '#textarea2' ).garlic( 'getPath' ) ).to.be( 'garlic:' + document.domain + window.location.pathname + '>' + 'form:eq(8)>textarea' );
      } )
      it ( 'getPath() for #checkbox1', function () {
        expect( $( '#checkbox1' ).garlic( 'getPath' ) ).to.be( 'garlic:' + document.domain + window.location.pathname + '>' + 'form:eq(3)>input.checkbox[]:eq(0)' );
      } )
      it ( 'getPath() for #checkbox2', function () {
        expect( $( '#checkbox2' ).garlic( 'getPath' ) ).to.be( 'garlic:' + document.domain + window.location.pathname + '>' + 'form:eq(3)>input.checkbox[]:eq(1)' );
      } )
      it ( 'getPath() for #radio1', function () {
        expect( $( '#radio1' ).garlic( 'getPath' ) ).to.be( 'garlic:' + document.domain + window.location.pathname + '>' + 'form:eq(4)>input.radio' );
      } )
      it ( 'getPath() for #radio2, should be same as #radio1', function () {
        expect( $( '#radio1' ).garlic( 'getPath' ) ).to.be( $( '#radio1' ).garlic( 'getPath' ) );
      } )
      it ( 'getPath() for elements with domain=true', function () {
        expect( $( '#input5' ).garlic( 'getPath' ) ).to.be( 'garlic:' + document.domain + '*>' + 'form:eq(6)>input' );
      } )
      it ( 'test custom getPath()', function () {
        expect( $( '#custom-get-path-field' ).garlic( 'getPath' ) ).to.be( 'custom-get-path-field_mypath' );
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
      it ( 'If custom onPersist function is defined, execute it', function () {
        $( '#persist-input' ).garlic ( 'persist', function () {
          expect( $( '#persist-input' ).attr( 'storedValue' ) ).to.be( 'bar' );
        } );
      } )
    } )

    /***************************************
                inputs binding
    ***************************************/
    describe ( 'Test inputs binding', function () {
      it ( 'On a simple form with only one input[type=text]', function () {
        expect( $( '#input1' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a simple form with only one input[type=text] and a textarea', function () {
        expect( $( '#input2' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
        expect( $( '#textarea1' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a div which is obviously not a form', function () {
        expect( $( '#div1' ).hasClass( 'garlic-auto-save' ) ).to.be( false );
      } )
      it ( 'On a single form element, not the wole form', function () {
        expect( $( '#input3' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
        expect( $( '#input4' ).hasClass( 'garlic-auto-save' ) ).to.be( false );
      } )
      it ( 'On a select input', function () {
        expect( $( '#select2' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a checkboxes inputs', function () {
        expect( $( '#checkbox1' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
        expect( $( '#checkbox2' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
        expect( $( '#checkbox3' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a radio buttons', function () {
        expect( $( '#radio1' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
        expect( $( '#radio2' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a form without data-persist, binded manually in javascript', function () {
        expect( $( '#input5' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a form that has data-storage="false" inputs', function () {
        expect( $( '#input12' ).hasClass( 'garlic-auto-save' ) ).to.be( false );
        expect( $( '#input13' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a form that is of type number', function () {
        expect( $( '#number' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a form that is of type tel', function () {
        expect( $( '#tel' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a form that is of type email', function () {
        expect( $( '#email' ).hasClass( 'garlic-auto-save' ) ).to.be( true );
      } )
      it ( 'On a form that is of type password', function () {
        expect( $( '#password' ).hasClass( 'garlic-auto-save' ) ).to.be( false );
      } )
      it ( 'On a file input', function () {
        expect( $( '#file' ).hasClass( 'garlic-auto-save' ) ).to.be( false );
      } )
      it ( 'On a hidden input', function () {
        expect( $( '#hidden' ).hasClass( 'garlic-auto-save' ) ).to.be( false );
      } )
    } )

    /***************************************
                trigger events
    ***************************************/
    describe ( 'Test inputs events', function () {
      var events = [ 'DOMAttrModified', 'textInput', 'input', 'change', 'keypress', 'paste', 'focus' ]
        , fieldPath = $( '#input6' ).garlic( 'getPath' );

        it ( 'Data is persisted on supported events: ' + events.join( ', ' ) , function () {
          for ( var event in events ) {
            $('#input6').val( 'foo' +  events[event] );
            $('#input6').trigger( $.Event( events[event] ) );
            expect( $( '#input6' ).val() ).to.be( 'foo' +  events[event] );
            expect( garlicStorage.get( fieldPath ) ).to.be( 'foo' +  events[event] );
          }
        } )
    } )

    /***************************************
              input data retrieving
    ***************************************/
    describe ( 'Test input data retrieving', function () {
      garlicStorage.set( $( '#input7' ).garlic( 'getPath' ), 'foo' );
      garlicStorage.set( $( '#textarea2' ).garlic( 'getPath' ), 'bar' );
      garlicStorage.set( $( '#radio1' ).garlic( 'getPath' ), 'radio1' );
      garlicStorage.set( $( '#checkbox1' ).garlic( 'getPath' ), 'checkbox1' );
      garlicStorage.set( $( '#checkbox2' ).garlic( 'getPath' ), 'checkbox2' );
      garlicStorage.set( $( '#checkbox3' ).garlic( 'getPath' ), 'wrong_data' );
      garlicStorage.set( $( '#select23' ).garlic( 'getPath' ), 'bar' );
      garlicStorage.set( $( '#retrieve-input' ).garlic( 'getPath' ), 'foo' );

      it ( 'An input should be populated by its stored data', function () {
        $( '#input7' ).garlic ( 'retrieve' );
        $( '#textarea2' ).garlic ( 'retrieve' );
        expect( $( '#input7' ).val() ).to.be( 'foo' );
        expect( $( '#textarea2' ).val() ).to.be( 'bar' );
      } )
      it ( 'Select must be setted accordingly to storage', function () {
        $( '#select23' ).garlic ( 'retrieve' );
        expect( $( '#select23' ).val() ).to.be( 'bar' );
      } )
      it ( 'Radio buttons must be checked accordingly to storage', function () {
        $( '#radio1' ).garlic ( 'retrieve', function () {
          expect( $( '#radio1' ).attr( 'checked' ) == 'checked' || $( '#radio1' ).attr( 'checked' ) == 'true' ).to.be( true );
        } );
        $( '#radio2' ).garlic ( 'retrieve', function () {
          expect( $( '#radio2' ).attr( 'checked' ) == undefined || $( '#radio2' ).attr( 'checked' ) == false ).to.be( true );
        } );
      } )
      it ( 'Checkboxes buttons must be checked accordingly to storage', function () {
        $( '#checkbox1' ).garlic ( 'retrieve' );
        $( '#checkbox2' ).garlic ( 'retrieve' );
        $( '#checkbox3' ).garlic ( 'retrieve' );
        expect( $( '#checkbox1' ).attr( 'checked' ) == 'checked' ||  $( '#checkbox1' ).attr( 'checked' ) == 'true' ).to.be( true );
        expect( $( '#checkbox2' ).attr( 'checked' ) == 'checked' ||  $( '#checkbox2' ).attr( 'checked' ) == 'true' ).to.be( true );
        expect( $( '#checkbox3' ).attr( 'checked' ) == undefined || $( '#checkbox3' ).attr( 'checked' ) == false ).to.be( true );
      } )
      it ( 'If custom retrieval function is defined, execute it', function () {
        $( '#retrieve-input' ).garlic ( 'retrieve', function () {
          expect( $( '#retrieve-input' ).attr( 'storedValue' ) ).to.be( 'foo' );
        } );
      } )
      it( 'When stored data is retrieved, an input event should be triggered', function ( done ) {
        $( '#retrieve-input' ).on( 'input', function () {
          done();
        } );
        $( '#retrieve-input' ).garlic ( 'retrieve' );
      } )
    } )

    /***************************************
            auto-expiration feature
    ***************************************/
    describe ( 'Auto expiration feature', function () {
      $( '#auto-expires' ).val( 'foo' );
      $( '#auto-expires-2' ).val( 'bar' );
      $( '#auto-expires-3' ).val( 'baz' );
      var expireFlag1, expireFlag2;

      it ( 'If data auto-expires, data is persisted an expires flag is set in localStorage', function () {
        $( '#auto-expires' ).bind( 'change', function () {
          var garlicFlagDate = garlicStorage.get( 'garlic:' + document.domain + window.location.pathname + '>form:eq(23)_flag' )
            , diffDates = parseInt( garlicFlagDate ) - new Date().getTime()
            , expireFlag2 = garlicFlagDate;

          expect( garlicStorage.get( $( '#auto-expires' ).garlic( 'getPath' ) ) ).to.be( 'foo' );

          $( '#auto-expires' ).garlic( 'retrieve', function () {
            expect( $( '#auto-expires' ).attr( 'expires-in' ) ).to.be( '14' );
          } )
        } )
        $( '#auto-expires-2' ).bind( 'change', function () {
          var garlicFlagDate = garlicStorage.get( 'garlic:' + document.domain + window.location.pathname + '>form:eq(23)_flag' )
            , diffDates = parseInt( garlicFlagDate ) - new Date().getTime()
            , expireFlag2 = garlicFlagDate;

          expect( garlicStorage.get( $( '#auto-expires-2' ).garlic( 'getPath' ) ) ).to.be( 'bar' );

          $( '#auto-expires-2' ).garlic( 'retrieve', function () {
            expect( $( '#auto-expires-2' ).attr( 'expires-in' ) ).to.be( '14' );
          } )
        } )
        $( '#auto-expires-3' ).bind( 'change', function () {
          var garlicFlagDate = garlicStorage.get( $( '#auto-expires-3' ).garlic( 'getPath' ) + '_flag')
            , diffDates = parseInt( garlicFlagDate ) - new Date().getTime();

          expect( garlicStorage.get( $( '#auto-expires-3' ).garlic( 'getPath' ) ) ).to.be( 'baz' );

          $( '#auto-expires-3' ).garlic( 'retrieve', function () {
            expect( $( '#auto-expires-3' ).attr( 'expires-in' ) ).to.be( '24' );
          } )
        } )

        $( '#auto-expires' ).trigger( 'change' );
        $( '#auto-expires-2' ).trigger( 'change' );
        $( '#auto-expires-3' ).trigger( 'change' );
      } )
      it ( 'If data-expires is set on a form item, all form fields have the same expiration date, and this date updates each time one of them item is updated', function () {
        expect( expireFlag1 ).to.be( expireFlag2 );
      } )
      it ( 'Data is not persisted in localStorage anymore after expiration time', function () {
        garlicStorage.set( 'garlic:' + document.domain + window.location.pathname + '>form:eq(23)_flag', ( new Date().getTime() - 200 ).toString() );
        $( '#auto-expires' ).garlic( 'retrieve', function () {
          expect( garlicStorage.has( $( '#auto-expires' ).garlic( 'getPath' ) ) ).to.be( false );
        } )
        $( '#auto-expires-2' ).garlic( 'retrieve', function () {
          expect( garlicStorage.has( $( '#auto-expires-2' ).garlic( 'getPath' ) ) ).to.be( false );
        } )
        $( '#auto-expires-3' ).garlic( 'retrieve', function () {
          expect( garlicStorage.has( $( '#auto-expires-3' ).garlic( 'getPath' ) ) ).to.be( true );
        } )
      } )
    } )

    /***************************************
               change input states
    ***************************************/
    describe ( 'Test input data change', function () {
      it ( 'If some text is added / removed in a textarea or an input[type=text], it should be updated in storage', function () {
        $( '#input12' ).val( 'hello world!' );
        $( '#input12' ).trigger( 'keypress', function () {
          expect( garlicStorage.get( $( '#input12' ).garlic( 'getPath' ) ) ).to.be( 'hello world!' );
        } )
      } )
      it ( 'If a text field is willingly cleared by an user, its storage will also be cleared', function () {
        $( '#input12' ).val( '' );
        $( '#input12' ).trigger( 'keypress', function () {
          expect( garlicStorage.has( $( '#input12' ).garlic( 'getPath' ) ) ).to.be( false );
        } )
      } )
      it ( 'If a select is changed, new value should be stored', function () {
        $( '#select3' ).val( 'bar' );
        $( '#select3' ).trigger( 'change', function () {
          expect( garlicStorage.get( $( '#select3' ).garlic( 'getPath' ) ) ).to.be( 'bar' );
        } )
      } )
      it ( 'If radio button is selected, value or new value should be stored', function () {
        $( '#radio1' ).val( 'foo' );
        $( '#radio1' ).trigger( 'change', function () {
          expect( garlicStorage.get( $( '#radio1' ).garlic( 'getPath' ) ) ).to.be( 'foo' );
        } )
      } )
      it ( 'Same, but with radio buttons not at the same DOM level', function () {
        $( '#radio2' ).val( 'bar' );
        $( '#radio2' ).trigger( 'change', function () {
          expect( garlicStorage.get( $( '#radio2' ).garlic( 'getPath' ) ) ).to.be( 'bar' );
        } )
      } )
      it ( 'If a checkbox is checked, its state should be persisted', function () {
        $( '#checkbox4' ).val( 'foo' );
        $( '#checkbox6' ).val( 'bar' );
        $( '#checkbox4' ).trigger( 'change', function () {
          expect( garlicStorage.get( $( '#checkbox4' ).garlic( 'getPath' ) ) ).to.be( 'foo' );
        } )
        $( '#checkbox6' ).trigger( 'change', function () {
          expect( garlicStorage.get( $( '#checkbox6' ).garlic( 'getPath' ) ) ).to.be( 'bar' );
        } )
      } )
      it ( 'Same, but with checkboxes not at the same DOM level', function () {
        $( '#checkbox7' ).val( 'bar' );
        $( '#checkbox8' ).val( 'baz' );
        $( '#checkbox7' ).trigger( 'change', function () {
          expect( garlicStorage.get( $( '#checkbox7' ).garlic( 'getPath' ) ) ).to.be( 'bar' );
        } )
        $( '#checkbox8' ).trigger( 'change', function () {
          expect( garlicStorage.get( $( '#checkbox8' ).garlic( 'getPath' ) ) ).to.be( 'baz' );
        } )
      } )
      it ( 'If a checkbox is unchecked, its state should be removed from storage', function () {
        $( '#checkbox9' ).trigger( 'click', function () {
          expect( $( '#checkbox9' ).attr( 'checked' ) ).to.be( 'checked' );
          expect( garlicStorage.get( $( '#checkbox9' ).garlic( 'getPath' ) ) ).to.be( 'foo' );
        } )
        $( '#checkbox9' ).trigger( 'click', function () {
          expect( $( '#checkbox9' ).attr( 'checked' ) == undefined || $( '#checkbox9' ).attr( 'checked' ) == false ).to.be( true );
          expect( garlicStorage.has( $( '#checkbox9' ).garlic( 'getPath' ) ) ).to.be( false );
        } )
      } )
    } )

    /***************************************
            conflicts management
    ***************************************/
    describe ( 'Conflicts management', function () {
      // tests for conflicts management, only for supported yet fields
      var conflicts = [ 'input', 'textarea', 'select' ];
      for ( var i in conflicts ) {
        garlicStorage.set ( $( '#' + conflicts[ i ] + '14' ).garlic( 'getPath' ), 'not default' );
      }

      it ( 'If ' + conflicts.join( ',' ) + ' fields have default value and conflictManager enabled, detect conflict', function () {
        for ( var i in conflicts ) {
          $( '#' + conflicts[ i ] + '14' ).garlic( 'retrieve', function () {
            expect( $( '#' + conflicts[ i ] + '14' ).hasClass( 'garlic-conflict-detected' ) ).to.be( true );
          } )
        }
      } )

      it ( 'If ' + conflicts.join( ',' ) + ' fields have default value and conflictManager enabled, display swap handler next to it', function () {
        for ( var i in conflicts ) {
          expect( $( '#' + conflicts[ i ] + '14' ).next( 'span' ).hasClass( 'garlic-swap' ) ).to.be( true );
        }
      } )
      it ( 'If garlicPriority is set to true (default), display for ' + conflicts.join( ',' ) + ' persisted data', function () {
        for ( var i in conflicts ) {
          expect( $( '#' + conflicts[ i ] + '14' ).val() ).to.be( 'not default' );
        }
      } )
      it ( 'If swap action is triggered, change data for ' + conflicts.join( ',' ) + ' fields', function () {
        for ( var i in conflicts ) {
          $( '#' + conflicts[ i ] + '14' ).next( 'span' ).click( function () {
            expect( $( '#' + conflicts[ i ] + '14' ).val() ).to.be( 'default value' );
          } )
        }
      } )
      it ( 'If swap action is triggered, again change data again for ' + conflicts.join( ',' ) + ' fields', function () {
        for ( var i in conflicts ) {
          $( '#' + conflicts[ i ] + '14' ).next( 'span' ).click( function () {
            expect( $( '#' + conflicts[ i ] + '14' ).val() ).to.be( 'not default value' );
          } )
        }
      } )

      it ( 'If garlicPriority is set to false, display default data and swap with persisted one', function () {
        garlicStorage.set( $( '#input15' ).garlic( 'getPath' ), 'not default value' );
        $( '#input15' ).garlic( 'retrieve', function () {
          expect( $( '#input15' ).hasClass( 'garlic-conflict-detected' ) ).to.be( true );
          expect( $( '#input15' ).next( 'span' ).hasClass( 'garlic-swap' ) ).to.be( true );
          expect( $( '#input15' ).val() ).to.be( 'default value' );
          $( '#input15' ).next( 'span' ).click( function () {
            expect( field.val() ).to.be( 'not default value' );
          } )
        } )
      } )
    } )

    /***************************************
                destroy data
    ***************************************/
    describe ( 'Test input data destroy', function () {
      // test here destroy localstorage on each input type for reset or submit button
      var names = [ 'input', 'textarea', 'select', 'checkbox', 'radio' ];
      var inputs = [ 'submit', 'reset' ];

      it ( inputs.join( ';' ) + ' button should destroy ' + names.join( ';' ) + ' fields persisted data', function () {
        for ( var j in inputs ) {
          for ( var i in names ) {
            garlicStorage.set( $( '#' + names[ i ] + '13' ).garlic( 'getPath' ), 'foo' );
            $( '#' + inputs[ j ] + '13' ).click( function () {
              expect( garlicStorage.has( $( '#' + names[ i ] + '13' ).garlic( 'getPath' ) ) ).to.be( false );
            } )
          }
        }
      } )

      it ( 'Reset button should remove both text and localStorage, but only on current form', function () {
        garlicStorage.set( $( '#input8' ).garlic( 'getPath' ), 'foo' );
        garlicStorage.set( $( '#input9' ).garlic( 'getPath' ), 'foo' );
        expect( garlicStorage.get( $( '#input8' ).garlic( 'getPath' ) ) ).to.be( 'foo' );
        expect( garlicStorage.get( $( '#input9' ).garlic( 'getPath' ) ) ).to.be( 'foo' );

        $('#reset1').click();
        $('#reset1').click( function () {
          expect( $( '#input9' ).val() ).to.be( '' );
          expect( garlicStorage.has( $( '#input9' ).garlic( 'getPath' ) ) ).to.be( false );
          expect( $( '#input8' ).val() ).to.be( 'foo' );
          expect( garlicStorage.get( $( '#input8' ).garlic( 'getPath' ) ) ).to.be( 'foo' );
        } )
      } )

      it ( 'Destroy localStorage when garlic( \'destroy\' ) is manually fired on an elem', function () {
        garlicStorage.set( $( '#input10' ).garlic( 'getPath' ), 'foo' );
        $( '#input10' ).garlic('destroy', function () {
          expect( garlicStorage.has( $( '#input10' ).garlic( 'getPath' ) ) ).to.be( false );
        } )
      } )
      it ( 'Do not destroy localStorage if data-destroy=false', function () {
        garlicStorage.set( $( '#textarea40' ).garlic( 'getPath' ), 'foo' );
        $( '#reset40' ).click( function () {
          expect( garlicStorage.get( $( '#textarea40' ).garlic( 'getPath' ) ) ).to.be( 'foo' );
        } )
        $( '#submit40' ).click( function ( e ) {
          expect( garlicStorage.get( $( '#textarea40' ).garlic( 'getPath' ) ) ).to.be( 'foo' );
          e.preventDefault();
        } )
        $( '#submit40' ).click();
        $( '#reset40' ).click();
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
