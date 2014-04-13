window.emlrip                               = window.emlrip || {};

(function(emlrip, $, ko, undefined) {
    'use strict';
    
    test("Hello Test", function() {
        ok(1 == "1", "Passed");
    });
    
    //
    // TESTS ----------------------------------------------------------------------------
    //
    
                            // a timeout delay is used in this test because the file
                            // processing in the view model is handed off to a background
                            // worker, therefore, the test needs to wait until the
                            // processing is complete and the response is returned from
                            // the worker.
    test("viewmodel test", function() {
        "use strict";
        
        emlrip.FileDropVM();       
        emlrip.fileInput(file);
        
        stop();
        
        setTimeout(function() {
            equal(emlrip.from(), "Tony Elovitz <tony@tecinv.com>", "Passed!");
            equal(emlrip.subject(), "Organizer App", "Passed!");
            equal(emlrip.timestamp(), "Mon, 31 Mar 2014 19:58:04 -0500", "Passed!");
            equal(emlrip.to(), "John Ronk <jgronktn@gmail.com>", "Passed!");
            
            start();
        }, 200);

    });
    
    
    //
    // INPUT DATA -----------------------------------------------------------------------
    //
    var file  = "Delivered-To: jgronktn@gmail.com\n" + 
                "Received: by 10.60.48.104 with SMTP id k8csp69620oen;\n" +
                "Mon, 31 Mar 2014 17:58:05 -0700 (PDT)\n" +
                "Return-Path: <telovitz@gmail.com>\n" + 
                "Received-SPF: pass (google.com: domain of telovitz@gmail.com designates 10.140.108.138 as permitted sender) client-ip=10.140.108.138\n" +
                "Authentication-Results: mr.google.com;\n" +
                "spf=pass (google.com: domain of telovitz@gmail.com designates 10.140.108.138 as permitted sender) smtp.mail=telovitz@gmail.com;\n" +
                "dkim=pass header.i=@gmail.com\n" +
                "X-Received: from mr.google.com ([10.140.108.138])\n" +
                "by 10.140.108.138 with SMTP id j10mr30357466qgf.7.1396313884764 (num_hops = 1);\n" +
                "Mon, 31 Mar 2014 17:58:04 -0700 (PDT)\n" +
                "DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;\n" +
                "d=gmail.com; s=20120113;\n" +
                "h=mime-version:sender:date:message-id:subject:from:to:content-type;\n" +
                "bh=tO1oupjS3RXGhblbhTKPPF9quVHIeTrknr0PtcmcTno=;\n" +
                "b=YlLcGP4MyfjX2a5pU+GbtggLjbzzjFnfz2CYlCIHiOUkQUdfwjWLVBL9JN04ArH4EJ\n" +
                "XK0v7JuXKYGGUOEOQaLdtSnooTauAA0Vc6FfieZ4F5fPMJ8VqzeEq/bri8lkeRkGiMo7\n" +
                "0S3a1KArEgBAZ56Q6OAIXAA673HAJL4Vg2Hi8IGUTl9dFI74T/zj/0l9QOHmwRJUqW0Q\n" +
                "BkAghG1z2QHQXgEUBgBtB8nTzuLtFX36OwAqkgxAKNlHFg/pm8ulTptuPbp3pObCTlQx\n" +
                "eLCcwkABUAKd9ddBEq2Zva67Ww15y8f7pjp7GAp3z3hwLttyjU8PrKKdUNkecD3OPciY\n" +
                "qhCQ==\n" +
                "MIME-Version: 1.0\n" +
                "X-Received: by 10.140.108.138 with SMTP id j10mr30357466qgf.7.1396313884759;\n" +
                "Mon, 31 Mar 2014 17:58:04 -0700 (PDT)\n" +
                "Sender: telovitz@gmail.com\n" +
                "Received: by 10.140.51.234 with HTTP; Mon, 31 Mar 2014 17:58:04 -0700 (PDT)\n" +
                "Date: Mon, 31 Mar 2014 19:58:04 -0500\n" +
                "X-Google-Sender-Auth: R1pJw8l73ybAvhiqW1qg8E7LTWU\n" +
                "Message-ID: <CAFu5EbaqDSw_SVoxEHjTyrkWnjTRjhVyxDu9OjMbmQZLoTksTA@mail.gmail.com>\n" +
                "Subject: Organizer App\n" +
                "From: Tony Elovitz <tony@tecinv.com>\n" +
                "To: John Ronk <jgronktn@gmail.com>\n" +
                "Content-Type: multipart/alternative; boundary=001a113a5104189b9504f5f0a968\n" +
                "\n" +
                "--001a113a5104189b9504f5f0a968\n" +
                "Content-Type: text/plain; charset=ISO-8859-1\n" +
                "\n" +
                "Hey,\n" +
                "\n" +
                "hope all is well" +
                "hope it all went well\n" +
                "\n" +
                "615.418.7972 | http://www.tecinv.com\n" +
                "\n" +
                "\n" +
                "--\n" + 
                "\n" +
                "615.418.7972 | http://www.tecinv.com\n" +
                "\n" +
                "--001a113a5104189b9504f5f0a968\n" +
                "Content-Type: text/html; charset=ISO-8859-1\n" +
                "Content-Transfer-Encoding: quoted-printable\n" +
                "\n" +
                "Hey,<br>\n" +
                "<br>\n" +
                "hope all is well=\n" +
                "hope it all went well=\n" +
                "<br>\n" +
                "\n" +
                "<br>\n" +
                "<br>\n" +
                '615.418.7972 | <a href=3D"http://www.tecinv.com" target=3D"_blank">http://w=\n' +
                "ww.tecinv.com</a><br>\n" +
                "<br>\n" +
                "<br><br>-- <br><br>Thanks,<br>Tony Elovitz<br><br>615.418.7972 | <a href=3D=\n" +
                '"http://www.tecinv.com" target=3D"_blank">http://www.tecinv.com</a><br><br>=\n' +
                "\n" +
                "--001a113a5104189b9504f5f0a968--\n";

}) (window.emlrip = window.emlrip || {}, jQuery, ko);
