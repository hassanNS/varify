// Generated by CoffeeScript 1.7.1

/*
The 'main' script for bootstrapping the default Cilantro client. Projects can
use this directly or emulate the functionality in their own script.
 */
require({
  config: {
    tpl: {
      variable: 'data'
    }
  }
}, ['cilantro', 'project/ui', 'project/csrf', 'tpl!templates/varify/tables/header.html', 'tpl!templates/varify/empty.html', 'tpl!templates/varify/modals/result.html'], function(c, ui, csrf, header, empty, result) {
  var options;
  options = {
    url: c.config.get('url'),
    credentials: c.config.get('credentials')
  };
  c.templates.set('varify/tables/header', header);
  c.templates.set('varify/empty', empty);
  c.templates.set('varify/modals/result', result);
  c.config.set('fields.defaults.form.stats', false);
  c.config.set('fields.types.number.form.chart', false);
  c.config.set('fields.types.date.form.chart', false);
  c.config.set('fields.types.time.form.chart', false);
  c.config.set('fields.types.datetime.form.chart', false);
  c.config.set('fields.instances.27.form.controls', ['multiSelectionList']);
  c.config.set('fields.instances.28.form.controls', ['multiSelectionList']);
  c.config.set('fields.instances.29.form.controls', ['multiSelectionList']);
  return c.ready(function() {
    return c.sessions.open(options).then(function() {
      var data, routes;
      routes = [
        {
          id: 'query',
          route: 'query/',
          view: new c.ui.QueryWorkflow({
            context: this.data.contexts.session,
            concepts: this.data.concepts.queryable
          })
        }, {
          id: 'results',
          route: 'results/',
          view: new ui.ResultsWorkflow({
            view: this.data.views.session,
            context: this.data.contexts.session,
            concepts: this.data.concepts.viewable,
            results: this.data.preview,
            exporters: this.data.exporter,
            queries: this.data.queries
          })
        }
      ];
      if (c.isSupported('2.2.0')) {
        routes.push({
          id: 'query-load',
          route: 'results/:query_id/',
          view: new c.ui.QueryLoader({
            queries: this.data.queries,
            context: this.data.contexts.session,
            view: this.data.views.session
          })
        });
      }
      if (c.isSupported('2.1.0')) {
        data = {
          queries: this.data.queries,
          context: this.data.contexts.session,
          view: this.data.views.session
        };
        if (c.isSupported('2.2.0')) {
          data.public_queries = this.data.public_queries;
        }
        routes.push({
          id: 'workspace',
          route: 'workspace/',
          view: new c.ui.WorkspaceWorkflow(data)
        });
      }
      return this.start(routes);
    });
  });
});
