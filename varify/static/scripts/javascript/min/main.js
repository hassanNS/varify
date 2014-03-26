require({config:{tpl:{variable:"data"}}},["cilantro","project/ui","project/csrf","tpl!project/templates/tables/header.html","tpl!project/templates/modals/result.html","tpl!project/templates/modals/phenotypes.html","tpl!project/templates/controls/sift.html","tpl!project/templates/controls/polyphen.html","tpl!project/templates/workflows/results.html"],function(e,t,n,r,i,s,o,u,a){var f={url:e.config.get("url"),credentials:e.config.get("credentials")},l=function(){var t={view:{columns:[2]}},n;return(n=e.session.data.views.session.get("json"))!=null&&(t.view.ordering=n.ordering),t};e.templates.set("varify/tables/header",r),e.templates.set("varify/modals/result",i),e.templates.set("varify/modals/phenotype",s),e.templates.set("varify/controls/sift",o),e.templates.set("varify/controls/polyphen",u),e.templates.set("varify/workflows/results",a),e.config.set("fields.defaults.form.stats",!1),e.config.set("fields.types.number.form.chart",!1),e.config.set("fields.types.date.form.chart",!1),e.config.set("fields.types.time.form.chart",!1),e.config.set("fields.types.datetime.form.chart",!1),e.config.set("fields.instances.27.form.controls",["multiSelectionList"]),e.config.set("fields.instances.28.form.controls",["multiSelectionList"]),e.config.set("fields.instances.29.form.controls",["multiSelectionList"]),e.config.set("fields.instances.61.form.controls",["multiSelectionList"]),e.config.set("fields.instances.64.form.controls",["multiSelectionList"]),e.config.set("fields.instances.75.form.controls",["search"]),e.config.set("fields.instances.68.form.controls",["singleSelectionList"]),e.controls.set("Sift",t.SiftSelector),e.controls.set("PolyPhen",t.PolyPhenSelector),e.config.set("fields.instances.58.form.controls",["Sift"]),e.config.set("fields.instances.56.form.controls",["PolyPhen"]),e.config.set("fields.instances.110.form.controls",[{options:{isNullLabel:"Not In HGMD",isNotNullLabel:"In HGMD"},control:"nullSelector"}]),e.config.set("session.defaults.data.preview",l);var c=function(t){return function(t){if(e.data==null)return;var n=_.map(t||[],function(t){if((currConcept=e.data.concepts.get(t.concept))!=null)return currConcept.get("name")}),r;return n?r="The following concepts are required: "+n.join(", "):r="There are 1 or more required concepts",e.notify({level:"error",message:r})}}(this);e.config.set("query.concepts.required",[2]),e.on(e.CONTEXT_INVALID,c),e.on(e.CONTEXT_REQUIRED,c),e.ready(function(){e.sessions.open(f).then(function(){e.panels={concept:new e.ui.ConceptPanel({collection:this.data.concepts.queryable}),context:new e.ui.ContextPanel({model:this.data.contexts.session})},e.dialogs={columns:new e.ui.ConceptColumnsDialog({view:this.data.views.session,concepts:this.data.concepts.viewable}),query:new e.ui.EditQueryDialog({view:this.data.views.session,context:this.data.contexts.session,collection:this.data.queries}),resultDetails:new t.ResultDetails,phenotype:new t.Phenotype({context:this.data.contexts.session})};var n=[];$.each(e.panels,function(e,t){t.render(),n.push(t.el)}),$.each(e.dialogs,function(e,t){t.render(),n.push(t.el)});var r=$(e.config.get("main"));r.append.apply(r,n),e.workflows={query:new e.ui.QueryWorkflow({context:this.data.contexts.session,concepts:this.data.concepts.queryable}),results:new t.ResultsWorkflow({view:this.data.views.session,results:this.data.preview,exporters:this.data.exporter})};var i=[{id:"query",route:"query/",view:e.workflows.query},{id:"results",route:"results/",view:e.workflows.results}];e.isSupported("2.1.0")&&(e.workflows.workspace=new e.ui.WorkspaceWorkflow({queries:this.data.queries,context:this.data.contexts.session,view:this.data.views.session,public_queries:this.data.public_queries}),i.push({id:"workspace",route:"workspace/",view:e.workflows.workspace})),e.isSupported("2.2.0")&&(e.workflows.queryload=new e.ui.QueryLoader({queries:this.data.queries,context:this.data.contexts.session,view:this.data.views.session}),i.push({id:"query-load",route:"results/:query_id/",view:e.workflows.queryload})),this.start(i)})})})