define( ['marionette'], function(Marionette){
    var Importer = Marionette.ItemView.extend( {
        template: 'varify/workflows/importer'
    });

    return {
        Importer: Importer
    }
});

