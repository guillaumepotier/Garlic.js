"use strict";

var testSuite = function () {
  describe ( 'Garlic.js test suite', function () {
    describe ( 'Test forms initialisation', function () {
      it ( 'On a simple form with only one input:text', function () {
        $('[rel=persist]').garlic();
        expect($("#input1").hasClass('garlic-auto-save')).to.be(true);
      } )
      it ( 'On a simple form with only one input:text and a textarea', function () {
        $('[rel=persist]').garlic();
        expect($("#input2").hasClass('garlic-auto-save')).to.be(true);
        expect($("#textarea1").hasClass('garlic-auto-save')).to.be(true);
      } )
      it ( 'On a div which is obviously not a form', function () {
        $('[rel=persist]').garlic();
        expect($("#div1").hasClass('garlic-auto-save')).to.be(false);
      } )
    } )
  } )
}