/**
 * keepinput: Save input as it's typed to local storage, so if the page
 * is reloaded, connection is lost, etc, the data is still there
 * Usage: Just just use as a jquery function e.g. $('#myobject').keepinput()
 * By default the saved version is discarded on form submit TODO: provide an override
 * TODO: provide expiration
 * @param {String} passedId : The id to use for this object. If no id is 
 * passed, the element needs to have an id
 */
(function( $ ) {
		$.fn.keepinput = function(passedId) {
			var id;
			var form = null;
			if (passedId) {
				id = passedId; //TODO test
			} else {
				id = this.attr('id'); //TODO: no id error
			}
			var type = this.get(0).tagName;
			if (type != 'FORM') {
				form = $(this.closest('form'));
				keepInputItem(id, form);
			} else {
				console.log('form');
				form = this;
				var elements = form.find("input, textarea").map(function(i, element) {
					id = $(element).attr('id'); //TODO: no id error
					keepInputItem(id, form);
				});
			}



			/*
			 * Handle a specific input field
			 */
			function keepInputItem(id, form) {
				$(document).ready(function() {//When the form is ready
					//load the value from local storage
					var prevValue = $.jStorage.get(id);
					if (prevValue) {
						$('#' + id).val(prevValue);
					}
				});

				//Whenever there's a change to the field
				$('#' + id).bind('input propertychage', function() {
					var val = $('#' + id).val();
					//save it
					$.jStorage.set(id, val);
				});

				//When the form is submitted
				form.submit(function() {
					//Remove the saved value for this field
					$.jStorage.deleteKey(id);
				});
			}

			return(this);
		};
})( jQuery );

