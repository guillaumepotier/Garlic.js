"use strict";

var testSuite = function () {
  describe ( 'Garlic.js test suite', function () {
    describe ( 'Test forms initialisation', function () {
      $('[rel=persist]').garlic();
      $('[rel=persist-select]').garlic({'inputs': 'input:text, textarea, select'});

      it ( 'On a simple form with only one input:text', function () {
        expect($("#input1").hasClass('garlic-auto-save')).to.be(true);
      } )
      it ( 'On a simple form with only one input:text and a textarea', function () {
        expect($("#input2").hasClass('garlic-auto-save')).to.be(true);
        expect($("#textarea1").hasClass('garlic-auto-save')).to.be(true);
      } )
      it ( 'On a div which is obviously not a form', function () {
        expect($("#div1").hasClass('garlic-auto-save')).to.be(false);
      } )
      it ( 'On a select input on default configuration: non persistency', function () {
        expect($("#select1").hasClass('garlic-auto-save')).to.be(false);
      } )
      it ( 'On a select input on extended configuration with select persistency', function () {
        expect($("#select2").hasClass('garlic-auto-save')).to.be(true);
      } )
    } )
  } )
}