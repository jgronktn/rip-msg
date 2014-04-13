window.emlrip                               = window.emlrip || {};

(function(emlrip, $, ko, undefined) {
    'use strict';
    
    // This is the emlrip app constructor.  This file sets up the "run"
    // function to initialize the app - including all viewmodels and models
    
    function App() {
        
        this.run                            = function() {
            
            var fileDropVM                  = new emlrip.FileDropVM();
            
    //        ko.applyBindings(fileDropVM, $('#fileDropRegion')[0]);
            ko.applyBindings(fileDropVM, $('#mainContainer')[0]);
        }   
    }
    emlrip.App                              = App;

}) (window.emlrip = window.emlrip || {}, jQuery, ko);
