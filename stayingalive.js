/**
 * keepinput: Save input as it's typed to local storage, so if the page
 * is reloaded, connection is lost, etc, the data is still there.
 *
 * Usage: Just just use as a jquery function e.g. $('#myobject').stayAlive();
 *
 * By default the saved version is discarded on form submit.
 *
 * @param {String} options.ttl: The expiration time for the saved values,
 *                              in milliseconds
 */
(function($) {
    $.fn.stayAlive = function(options) {
        options = $.extend(
            {},
            {
                ttl: undefined // milliseconds
            },
            options || {}
        );

        var form = this.closest("form");

        if (this.is("form")) {
            this.find("input, textarea").each(function() {
                keepInputItem($(this).prop("id"), form);
            });
        } else {
            keepInputItem(this.prop("id"), form);
        }

        /*
         * Handle a specific input field
         */
        function keepInputItem(id, form) {
            if (!id) {
                throw new Error(
                    "stayAlive: All preserved inputs must have an ID.");
            }

            $(function() {//When the form is ready
                //load the value from local storage
                var prevValue = $.jStorage.get(id);
                if (prevValue) {
                    $('#' + id).val(prevValue);
                }
            });

            //Whenever there's a change to the field
            $('#' + id).bind('input propertychange', function() {
                var val = $('#' + id).val();
                //save it
                $.jStorage.set(id, val, {TTL: options.ttl});
            });

            //When the form is submitted
            form.submit(function() {
                //Remove the saved value for this field
                $.jStorage.deleteKey(id);
            });
        }

        return this;
    };
})(jQuery);
