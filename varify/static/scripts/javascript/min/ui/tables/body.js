var __bind=function(e,t){return function(){return e.apply(t,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var n in t)__hasProp.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};define(["underscore","marionette","./row"],function(e,t,n){var r;return r=function(t){function r(){return this.itemViewOptions=__bind(this.itemViewOptions,this),r.__super__.constructor.apply(this,arguments)}return __extends(r,t),r.prototype.tagName="tbody",r.prototype.template=function(){},r.prototype.itemView=n.ResultRow,r.prototype.itemViewOptions=function(t,n){return e.defaults({resultPk:t.get("pk")},this.options)},r}(t.CollectionView),{ResultBody:r}})