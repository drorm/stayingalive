Staying Alive
============

Saves your form data client side between page reloads.

Just like gmail you can now have the data typed in textareas and input fields
saved when a tab is closed by accident or the browser crashes. keepinput.js is
100% client side and with one line of javascript you can save a single field or
all the input and textarea fields in a form.

## Usage

    $('#form1').keepinput();//preserve all textareas and fields in the form
    $('#input1').keepinput();//preserve this input field
    $('#textarea1').keepinput();//preserve this textarea

You *need* to assign a unique id to the fields or forms that are preserved. Class selectors are not supported since:

1. A unique id is needed to save the field in the browser. 
2. The script could generate a unique id based on position, but that's a fragile solution since moving fields around will result in wrong data showing in existing forms.


## Requirements

In addition to keepinput.js you need:

* jquery
* json2.js (for legacy browser support)
* jstorage.js
