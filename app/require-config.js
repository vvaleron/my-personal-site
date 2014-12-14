require.config({

  // alias libraries paths
    paths: {
        // 'domReady': '../lib/requirejs-domready/domReady',
        'angular': './resources/js/angular/angular',
        'authorization': './modules/authorization/authorization',
        'angularRoute': './resources/js/angular-route/angular-route'
    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angularRoute': {
            deps: ['angular']
        },
        'angular': {
            exports: 'angular'
        }
    },

    // kick start application
    deps: [
    'app',
    'app-controller'
    ]
});