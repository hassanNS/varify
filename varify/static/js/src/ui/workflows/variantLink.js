/* global define */

define([
    'marionette',
    '../modals/result'
], function(Marionette, Result) {

    var VariantLink = Marionette.Layout.extend({
        tagName: 'div',

        template: 'varify/workflows/variantLink',

        onRender: function() {
            console.log("SHIT I WORK!!");
        }
    });

    return {
        VariantLink: VariantLink
    };

});
