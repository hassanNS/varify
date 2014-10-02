define(["underscore","marionette","../../models","../../utils"],function(e,t,n,r){var i=t.ItemView.extend({className:"modal hide",template:"varify/modals/phenotype",ui:{annotations:"[data-target=annotations]",closeButton:"[data-target=close-phenotypes]",content:"[data-target=content]",diagnoses:"[data-target=diagnoses]",error:"[data-target=error]",headerLabel:"[data-target=header-label]",loading:"[data-target=loading]",notes:"[data-target=notes]",pedigree:"[data-target=pedigree]",recalculateButton:"[data-target=recalculate]",updateTimes:"[data-target=update-times]",warning:"[data-target=warning]",hideOnRetrieve:"[data-action=hide-on-retrieve]"},events:{"click @ui.closeButton":"close","click @ui.recalculateButton":"recalculate"},alerts:{missingSample:"The phenotypes cannot be retrieved because there is not any sample selected. To select a sample, navigate to the Query page and open the Sample concept(under the Proband header). From this control, you can use the +/- buttons to add a sample to the list or enter a label directly in the text box. Once you have selected a sample, click the &quot;Apply Filter&quot; button and then return to this page and reopen this window to retrieve the phenotypes.",multipleSamples:"The phenotypes cannot be retrieved because there are multiple samples selected. To fix this, navigate to the Query page and open the Sample concept(under the Proband header). From this control you can remove samples directly from the text box or using the - buttons. Once you have limited the set to a singe sample, click the &quot;Update Filterbutton and then return to this page and reopen this window to retrieve the phenotypes"},initialize:function(){this.data={},e.bindAll(this,"onFetchError","onFetchSuccess");if(!(this.data.context=this.options.context))throw new Error("context model required");if(!(this.data.samples=this.options.samples))throw new Error("samples collection required")},renderHPO:function(e){var t=[],n,r;t.push("<div class=span6>"),t.push("<h6>HPO:</h6>");if(e&&e.length){t.push("<ul>");for(n in e)t.push("<li>"),t.push('<a href="http://www.human-phenotype-ontology.org/hpoweb/showterm?id='+e[n].hpo_id+'" target="_blank">'+e[n].name+"</a>"),(r=e[n].priority)&&t.push('<span class="badge badge-important">'+r+"</span>"),t.push("</li>");t.push("</ul>")}else t.push("<span class=muted>No HPO annotations</span>");return t.push("</div>"),t.join("")},renderNotes:function(e){var t=[];return t.push("<div class=span6>"),t.push("<h6>Notes:</h6>"),e&&e.length?t.push("<p>"+e[0].note):t.push("<span class=muted>No notes</span>"),t.join("")},_renderDiagnoses:function(e){if(e&&e.length){var t=[],n;t.push("<ul>");for(n in e)t.push("<li>"),t.push('<a href="http://purl.bioontology.org/ontology/OMIM/'+e[n].omim_id+'" target="_blank">'+e[n].name+"</a>"),e[n].priority&&t.push('<span class="badge badge-important">'+e[n].priority+"</span>"),t.push("</li>");return t.push("</ul>"),t.join("")}return"<span class=muted>No diagnoses</span>"},renderDiagnoses:function(e){var t=[];return t.push("<div class=span4>"),t.push("<h6>Confirmed Diagnoses:</h6>"),t.push(this._renderDiagnoses(e.confirmedDiagnoses)),t.push("</div>"),t.push("<div class=span4>"),t.push("<h6>Suspected Diagnoses:</h6>"),t.push(this._renderDiagnoses(e.suspectedDiagnoses)),t.push("</div>"),t.push("<div class=span4>"),t.push("<h6>Ruled Out Diagnoses:</h6>"),t.push(this._renderDiagnoses(e.ruledOutDiagnoses)),t.push("</div>"),t.join("")},renderUpdateTimes:function(e){var t=[];return t.push("<div class=span6>"),t.push("<h6>Phenotypes Updated: </h6>"+e.last_modified),t.push("</div>"),t.push("<div class=span6>"),t.push("<h6>Rankings Updated: </h6>"+e.phenotype_modified),t.push("</div>"),t.join("")},onFetchSuccess:function(e){delete this.request,this.ui.recalculateButton.prop("disabled",!1),this.ui.loading.hide();var t=e.attributes;this.ui.annotations.html(this.renderHPO(t.hpoAnnotations)),this.ui.notes.html(this.renderNotes(t.notes)),this.ui.diagnoses.html(this.renderDiagnoses(t)),this.ui.updateTimes.html(this.renderUpdateTimes(t)),t.pedigree?(this.ui.pedigree.attr("href",t.pedigree),this.ui.pedigree.show()):this.ui.pedigree.hide(),this.ui.content.show()},onFetchError:function(){delete this.request,this.ui.loading.hide(),this.ui.error.html("There was an error retrieving the phenotypes."),this.ui.error.show()},recalculate:function(){this.retrievePhenotypes(!0)},retrievePhenotypes:function(e){e===null&&(e=!1),this.ui.hideOnRetrieve.hide(),this.ui.recalculateButton.prop("disabled",!0);var t=r.samplesInContext(this.data.context,this.data.samples);if(t.length===1){this.ui.headerLabel.text("Phenotypes for "+t[0]),this.ui.loading.show();var i=new n.Phenotype({sampleId:t[0]}),s=this;this.request=i.fetch({data:{recalculate_rankings:e},processData:!0,success:function(e){s.onFetchSuccess(e)},error:this.onFetchError})}else this.ui.headerLabel.text("Phenotypes"),t.length===0?this.ui.error.html(this.alerts.missingSample):this.ui.error.html(this.alerts.multipleSamples),this.ui.error.show()},open:function(){this.retrievePhenotypes(),this.$el.modal("show")},close:function(){this.request&&(this.request.abort(),delete this.request),this.$el.modal("hide")}});return{Phenotype:i}})