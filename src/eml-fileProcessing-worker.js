    // This file contains the email file processing functionality.
    //
    // @param file data object
    //  - msgType:  contains the type of email file
    //  - file:     contains the email fiel as a string
    //
    // @return      a message is posted back to the main thread with the email data object
    
    onmessage                               = function(evt) {

        switch (evt.data.msgType) {
            case ".eml":
                var size                        = evt.data.file.length;
                            // An .eml file is broken into lines of information.
                            // Split this first to parse for the data in an array
                var fileLines                   = evt.data.file.split("\n");
            
                var date1;
                var from;
                var subject;
                var to;
                            // loop through the lines of the email file and look for
                            // the header data.
                            //
                            // TODO: If the file has a large attachement this could take
                            // a long time.  Need to set a limit to the number of lines that will
                            // be parsed for header information.  
                for (var i = 0; i < fileLines.length; i++) {
                    var index                   = 0;
                
                    index                       = fileLines[i].indexOf("From:", 0);
                    if (index > -1) { from      = fileLines[i].substring(index + 1 + ("From:").length); continue; }            
                    index                       = fileLines[i].indexOf("Subject:", 0);
                    if (index > -1) { subject   = fileLines[i].substring(index + 1 + ("Subject:").length); continue; }
                    index                       = fileLines[i].indexOf("To:", 0);
                    if (index > -1) { to        = fileLines[i].substring(index + 1 + ("To:").length); continue; }
                    index                       = fileLines[i].indexOf("Date:", 0);
                    if (index > -1) {
                        date1                   = fileLines[i].substring(index + 1 + ("Date:").length);
                        continue;
                    }
                }

                postMessage({ msgType: "fileResponse", data: { date: date1, from: from, subject: subject, size: size, to: to } });
                break;
            
            default:
                break;
        }
    }
