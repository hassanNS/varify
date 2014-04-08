define(["underscore","marionette","./base"],function(t,e,i){var n=e.ItemView.extend({tagName:"li",template:"accordian/item"}),s=e.CompositeView.extend({className:"section",itemView:n,template:"accordian/section",itemViewContainer:".items",ui:{heading:".heading"},isEmpty:function(){return 0===this.collection.length},onCompositeCollectionRendered:function(){this.$el.toggle(!this.isEmpty())}}),o=e.CompositeView.extend({className:"group",template:"accordian/group",itemView:s,itemViewContainer:".sections",itemSectionItems:"items",options:{collapsable:!0,collapsed:!0},ui:{heading:".heading",icon:".heading [data-toggle]",inner:".inner"},events:{"click > .heading":"toggleCollapse"},itemViewOptions:function(t,e){return{model:t,index:e,collection:t[this.itemSectionItems]}},initialize:function(){this.collapsed=this.options.collapsed},onRender:function(){this.options.collapsable?this.collapsed&&this.renderCollapsed():(this.renderExpanded(),this.ui.icon.hide())},isEmpty:function(){if(this.collection.length>0)return!1;for(var t=0;t<this.collection.length;t++)if(this.collection.models[t].items.length>0)return!1;return!0},onCompositeCollectionRendered:function(){if(this.$el.toggle(!this.isEmpty()),this.collection.length>0){var t=this.collection.at(0),e=this.children.findByModel(t);e.ui.heading.toggle(this.collection.length>1||t.id>-1)}},collapse:function(t){this.options.collapsable&&(this.collapsed=!0,this.renderCollapsed(t))},expand:function(t){this.options.collapsable&&(this.collapsed=!1,this.renderExpanded(t))},toggleCollapse:function(t){t.preventDefault(),this.options.collapsable&&(this.collapsed?this.expand({animate:!0}):this.collapse({animate:!0}))},renderState:function(t){this.collapsed&&this.options.collapsable?this.renderCollapsed(t):this.renderExpanded(t)},renderExpanded:function(t){t=t||{},this.$el.removeClass("collapsed"),t.animate?this.ui.inner.collapse("show"):this.ui.inner.addClass("in")},renderCollapsed:function(t){t=t||{},this.$el.addClass("collapsed"),t.animate?this.ui.inner.collapse("hide"):this.ui.inner.removeClass("in")}}),r=e.CollectionView.extend({className:"accordian",itemView:o,emptyView:i.EmptyView,itemGroupSections:"sections",options:{collapsable:!0},itemViewOptions:function(t,e){return{model:t,index:e,collection:t[this.itemGroupSections],collapsable:this.options.collapsable}}});return{Accordian:r,Group:o,Section:s,Item:n}});
//@ sourceMappingURL=accordian.js.map