#Changelog

* **0.0.9** : 
    
    - added option `data-destroy=false` to give the possibility to not destroy
      localStorage on submit and reset button

* **0.0.8** : 

    - changed a bit the way inputs elements paths is calculated. Now, we
      could store data on a page basis or on the whole domain (recurrent form)

    - changed a bit public functions interface:
      `garlicStorage` is now attached to window. TODO: make something better..
      To get an element's path, now use `$( '#youinput' ).garlic( 'getPath' );`

* **0.0.7** : 

    - added support for select, radio and checkbox inputs. Added some tests
      Some of them are waiting to be written

* **0.0.6** : 
    
    - added Zepto support. Now Garlic.js with Zepto standalone is < 30Ko! 
 
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