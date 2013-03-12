/**
 * stayAlive: Save input as it's typed to local storage, so if the page
 * is reloaded, connection is lost, etc, the data is still there.
 *
 * Usage: Just just use as a jquery function e.g. $('#myobject').stayAlive();
 *
 * By default the saved version is discarded on form submit.
 *
 * @param {String} options.scope: A string identifying this page, and
 *                                distinguishing it from other pages on the
 *                                same origin that may have inputs with the same
 *                                ID's (default: `window.location.pathname`).
 * @param {Number} options.ttl:   The expiration time for the saved values,
 *                                in milliseconds
 */
(function($) {
    $.fn.stayAlive = function(options) {
        options = $.extend(
            {},
            {
                scope: window.location.pathname,
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

            var key = options.scope + ":" + id;

            $(function() {//When the form is ready
                //load the value from local storage
                var prevValue = $.jStorage.get(key);
                if (prevValue) {
                    $('#' + id).val(prevValue);
                }
            });

            //Whenever there's a change to the field
            $('#' + id).bind('input propertychange', function() {
                var val = $('#' + id).val();
                //save it
                $.jStorage.set(key, val, {TTL: options.ttl});
            });

            //When the form is submitted
            form.submit(function() {
                //Remove the saved value for this field
                $.jStorage.deleteKey(key);
            });
        }

        return this;
    };
})(jQuery);
