require.config({

  // alias libraries paths
    paths: {
        'domReady': './resources/js/require/domReady',
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

/**
 * bootstraps angular onto the window.document node
 */
define([
    'require',
    'angular'
], 

function (require, ng) {
    'use strict';
    window.name = "NG_DEFER_BOOTSTRAP!";
    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['app']);
    });
});