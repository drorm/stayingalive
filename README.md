Staying Alive
============

Saves your form data client side between page reloads.

Just like gmail you can now have the data typed in textareas and input fields
saved when a tab is closed by accident or the browser crashes. stayingalive.js is
100% client side and with one line of javascript you can save a single field or
all the input and textarea fields in a form.
Works for multiple pages on your site.
Demo: http://drorm.github.com/stayingalive/

## Usage

    $('#form1').stayingalive();//preserve all textareas and fields in the form
    $('#input1').stayingalive();//preserve this input field
    $('#textarea1').stayingalive();//preserve this textarea

##Params
stayingalive() takes an object as an argument:
```
{
	scope: scope of the form. Defaults to  window.location.pathname(current URL)
	ttl: how long to keep the info in local storage
}
```


You *need* to assign a unique id or pass an id as an argument to the fields or forms that are preserved. Class selectors are not supported since:

1. A unique id is needed to save the field in the browser. 
2. The script could generate a unique id based on position, but that's a fragile solution since moving fields around will result in wrong data showing in existing forms.


## Requirements

In addition to stayingalive.js you need:

* jquery
* json2.js (for legacy browser support)
* jstorage.js

Or you can get all of these from CDN
```
<script src="http://cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jStorage/0.3.0/jstorage.min.js"></script>
```
