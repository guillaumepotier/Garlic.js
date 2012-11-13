#Changelog

* **0.0.6** : added Zepto support. Now Garlic.js with Zepto standalone is < 30Ko! 
 
   - Zepto does not support `input:text`, use `input[type=text]` instead  

   - Zepto standard build does not include jQuery `data()` support.  
     Please see Zepto readme to learn how to build your custom Zepto  
     with data support https://github.com/madrobby/zepto#readme  

   - test suite is runnable with Zepto, uncomment zepto inclusion in
     tests/test.html

* **0.0.5** : added support of input="reset" + improved tests

* **0.0.4** : added data-api, no more need to call the plugin in javascript, just use  
              `data-persist="garlic"` in your form tag

* **0.0.3** : fixed bug on standalone inputs. Added more tests

* **0.0.2** : added optional support for select input, events and more tests. (@cdmoyer)

* **0.0.1** : initial commit. garlicjs.org. First release (@johnrees)