/* global define */

define([
    'jquery',
    'underscore',
    'cilantro',
    'backbone',
    'marionette',
    '../../utils'
], function($, _, c, Backbone, Marionette, utils) {

    var CohortPopoverItem = Marionette.ItemView.extend({
        tagName: 'li',

        template: 'varify/variant/cohort-popover-item',

        templateHelpers: function() {
            var samplePath = 'samples/' + this.model.get('id');

            return {
                sampleUrl: utils.toAbsolutePath(samplePath)
            };
        }
    });

    var CohortPopoverCollection = Marionette.CollectionView.extend({
        className: 'unstyled',

        tagName: 'ul',

        template: 'varify/variant/cohort-popover-collection',

        itemView: CohortPopoverItem
    });

    var CohortItem = Marionette.ItemView.extend({
        template: 'varify/variant/cohort-item',

        tagName: 'li',

        ui: {
            contentContainer: '[data-target=cohort-popover]'
        },

        templateHelpers: function() {
            return {
                frequency: c.utils.prettyNumber(this.model.get('af') * 100)
            };
        },

        onRender: function() {
            var popoverView = new CohortPopoverCollection({
                collection: new Backbone.Collection(this.model.get('samples'))
            });

            this.ui.contentContainer.attr(
                'data-content', popoverView.render().el.outerHTML);
        }
    });

    var Cohorts = Marionette.CompositeView.extend({
        template: 'varify/variant/cohorts',

        itemView: CohortItem,

        itemViewContainer: '[data-target=items]',

        popoverSelector: '[data-target=cohort-popover]',

        initialize: function() {
            _.bindAll(this, 'hidePopover');

            $(document).on('click', this.hidePopover);
        },

        hidePopover: function(event) {
            $(this.popoverSelector).not(event.target).popover('hide');
        },

        onRender: function() {
            this.$el.find(this.popoverSelector).popover({
                container: '#result-details-modal',
                html: true,
                title: 'Samples in Cohort'
            });
        }
    });

    return {
        Cohorts: Cohorts
    };
});