#Changelog

* **1.2.3** :

    - added `excluded` options (#67)
    - added event triggering when data is retrived (#63)

* **1.2.2** :

    - fixed checkboxes issue (#40)

* **1.2.1** :

    - fixed checkbox behavior (#32)
    - garlic conflic manager is deactivated by default now (#24)

* **1.2.0** :

    - added custom getPath() function in config for custom key-storing strategy
      implementation in localStorage

* **1.1.2** :

    - do not bind anymore input[type=password] with Garlic for evident security
      reasons (@nashby)

* **1.1.1** :

    - perf improvement on persist with redundant events

* **1.1.0** :

    - added auto-expiration feature

* **1.0.3** :

    - added onRetrieve function in config. Called each time Garlic retrieves a field
      stored value. Overridable by configuration

* **1.0.2** :

    - fixed bug that did not allowed user to clear a field persisted by Garlic

* **1.0.1** :

    - Garlic now works on any input field

* **1.0.0** : First "stable" v1 version

    - created bin/build.sh script to build and dump various prod min files

    - created full standalone version, with minimum Zepto builded inside!

* **0.1.1** :

    - fixed bug where data-storage="false" would stick.

    - customized test suite to accept dev and minified version, jquery or zepto lib.

    - updated travis-ci tests accordingly

* **0.1.0** :

    - added first step of conflicts management. For input[type=text], textarea
      and select. See doc

    - travis-ci tests integration now

* **0.0.10** :

    - added option `data-domain=true` to give the possibility to persist form
      data accross all website pages. By default, only specific to current page

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
