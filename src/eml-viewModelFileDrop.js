window.emlrip                               = window.emlrip || {};

(function(emlrip, $, ko, undefined) {
    'use strict';
    
    // This file contains the file drop viewmodel functionality.  This viewmodel is
    // responsible for handling the file drop function, reading the file and displaying
    // the status of the file parsing process.
    //
    // When a .eml file is dropped into the "fileDrop" region of the web page it is read
    // by the FileReader API and converted to a string.  The file string is sent to
    // a background worker to be processed outside of the UI thread.  Once the file
    // processing is complete the response data is stored in the data binding variables
    // that update the UI.
    
    function FileDropVM() {
        
        var self                            = this;
        
        self.from                           = ko.observable();          // holds the UI sender email address
        self.subject                        = ko.observable();          // holds the UI email subject
        self.size                           = ko.observable();          // holds the UI email file size
        self.timestamp                      = ko.observable();          // holds the UI email date
        self.to                             = ko.observable();          // holds the UI recipients addresses

                            // File processing background worker
        var fileProcessing                  = new Worker("../src/eml-fileProcessing-worker.js");
            fileProcessing.onmessage        = fileProcessingResponse;
            fileProcessing.onerror          = function(evt) { throw new Error(evt.message + " (" + evt.filename + ":" + event.lineno + ")"); };


        
    //
    // Public Methods -------------------------------------------------------------------
    //
        /// fileInput
        ///
        /// This method dispatches the file information read in from the user input to
        /// the background worker process
        ///
        /// @param  string file
        ///
        self.fileInput                      = function(file) {
            
            fileProcessing.postMessage({ msgType: '.eml', file: file });
       }
        
        
        
    //
    // Private Methods ------------------------------------------------------------------
    //
        /// fileProcessingResponse
        ///
        /// This method is the post message handler for the file processing background
        /// worker.  It receives the response data and stores it in the appropriate
        /// UI data binding variables.
        ///
        /// @param file info object
        ///
        function fileProcessingResponse(response) {
            
            self.from(response.data.data.from);
            self.subject(response.data.data.subject);
            self.size(response.data.data.size);
            self.timestamp(response.data.data.date);
            self.to(response.data.data.to);
        }


    //
    // Event Handlers -------------------------------------------------------------------
    //

        /// fileDrop Drag Enter
        ///
        /// prevent the default browser behavior when an item is dragged into the
        /// fileDrop region
        $('#fileDropRegion').on('dragenter', function(evt) { evt.preventDefault(); evt.stopPropagation(); });

        /// fileDrop Drag Over
        ///
        /// prevent the default browser behavior when an item is dragged over the
        /// fileDrop region
        $('#fileDropRegion').on('dragover', function(evt) { evt.preventDefault(); evt.stopPropagation(); });

        /// fileDrop Drop
        ///
        /// When a file is dropped into the fileDrop region of the page, check that it
        /// is a valid file (look at the extension for .eml), read the file and send it
        /// to a background worker for processing
        ///
        $('#fileDropRegion').on('drop', function(evt) {
            if (evt.preventDefault) { evt.preventDefault(); }
            
            var files                       = evt.originalEvent.dataTransfer.files;
            
            console.info(files[0].name);
                            // create the FileReader to read file into a buffer
            var reader                      = new FileReader();
                            // once file has been read into FileReader object, put it
                            // into a byte buffer
                reader.onload               = function(evt) {
                    var file                = evt.target.result;
                    var uint8View           = new Uint8Array(file);

                            // send file to processing worker
                    self.fileInput(file);
                }
                            // start the file read process - read as string
                reader.readAsBinaryString(files[0]);
        });
    }
    emlrip.FileDropVM                       = FileDropVM;
    
    
}) (window.emlrip = window.emlrip || {}, jQuery, ko);
