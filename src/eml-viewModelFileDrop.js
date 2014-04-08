window.emlrip                               = window.emlrip || {};

(function(emlrip, $, ko, undefined) {
    'use strict';
    
    // This file contains the file drop viewmodel functionality.  This viewmodel is
    // responsible for handling the file drop function, reading the file and displaying
    // the status of the file parsing process.
    
    function FileDropVM() {
        
        var self                            = this;

        var fileProcessing                  = new Worker("eml-fileProcessing-worker.js");
            fileProcessing.onmessage        = fileProcessingResponse;
            fileProcessing.onerror          = function(evt) { throw new Error(evt.message + " (" + evt.filename + ":" + event.lineno + ")"); };




        function fileProcessingResponse(response) {
            
            var t = 0;
        }

    //
    // Event Handlers -------------------------------------------------------------------
    //
        $('#fileDropRegion').on('dragenter', function(evt) {
            if (evt.preventDefault) { evt.preventDefault(); }
            if (evt.stopPropagation) { evt.stopPropagation(); }
        });
        $('#fileDropRegion').on('dragover', function(evt) {
            if (evt.preventDefault) { evt.preventDefault(); }
            if (evt.stopPropagation) { evt.stopPropagation(); }
        });
        $('#fileDropRegion').on('drop', function(evt) {
            if (evt.preventDefault) { evt.preventDefault(); }

            var files                       = evt.originalEvent.dataTransfer.files;

            var reader                      = new FileReader();
                reader.onload               = function(evt) {
                    var file                = evt.target.result;
                    var uint8View           = new Uint8Array(file);

                    fileProcessing.postMessage({ msgType: 'file', file: uint8View });
                }
                reader.readAsArrayBuffer(files[0]);
        });
    }
    emlrip.FileDropVM                       = FileDropVM;
    
    
}) (window.emlrip = window.emlrip || {}, jQuery, ko);