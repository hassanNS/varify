define(["underscore","marionette","./layout"],function(t,e,i){var n=e.Layout.extend({className:"columns-modal modal hide full",template:"concept/columns/dialog",events:{"click [data-save]":"save","click [data-dismiss]":"cancel"},regions:{body:".modal-body"},regionViews:{body:i.ConceptColumnsLayout},initialize:function(){if(this.data={},!(this.data.view=this.options.view))throw new Error("view required");if(!(this.data.concepts=this.options.concepts))throw new Error("concepts collection required")},onRender:function(){this.$el.modal({show:!1,keyboard:!1,backdrop:"static"}),this.columns=new this.regionViews.body({view:this.data.view,concepts:this.data.concepts}),this.body.show(this.columns)},cancel:function(){var e=this;t.delay(function(){e.columns.resetSelected()},25)},save:function(){this.data.view.facets.reset(this.columns.selectedToFacets()),this.data.view.save(),this.close()},open:function(){this.$el.modal("show")},close:function(){this.$el.modal("hide")}});return{ConceptColumnsDialog:n}});
//@ sourceMappingURL=dialog.js.map