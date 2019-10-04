//Variables
var contract;
var hash;
var digitalSignature;
var publicKey;
var encrypt = new JSEncrypt({default_key_size: 1024});
var base64Img = null;
var uploadPDF;
var privateKey;
var isSignLender = false;
var isSignBorrower = false;
var clicked = false;
var errorSet = false;
var successSet = false;
var validSet = false;

//$(".error").click(function ()
//{
//    $('.error').slideToggle(1000, 'swing');
//    errorSet = false;
//});
//
//$(".success").click(function ()
//{
//    $('.success').slideToggle(1000, 'swing');
//    successSet = false;
//});
//
//$(".validation").click(function ()
//{
//    $('.validation').slideToggle(1000, 'swing');
//    validSet = false;
//});

function popUp(message, type) {
    $(".button-agr").removeAttr("disabled");
    if (type == "success")
    {
        if (successSet === false)
        {
            if (validSet)
            {
                $('.validation').stop();
                $('.validation').slideToggle(1000, 'swing');
            }

            if (errorSet)
            {
                $('.error').stop();
                $('.error').slideToggle(1000, 'swing');
            }


            $('.success').slideToggle(0, 'swing');
            $('.success').slideToggle(0, 'swing');
            $('.success').slideToggle(1000, 'swing');
            successSet = true;

            $(".success").css("display", "block");
            $('.success').html(message);

            setTimeout(function () {
                $('.success').stop();
                $('.success').slideToggle(1000, 'swing');
                successSet = false;
            }, 6000);
        } else
        {
            $('.success').stop();
            $('.success').slideToggle(1000, 'swing');
            $('.success').slideToggle(1000, 'swing');
            $('.success').html(message);
        }
    } else if (type == "error")
    {
        if (errorSet === false)
        {
            if (validSet)
            {
                $('.validation').stop();
                $('.validation').slideToggle(1000, 'swing');
            }
            if (successSet)
            {
                $('.success').stop();
                $('.success').slideToggle(1000, 'swing');
            }

            $('.error').slideToggle(0, 'swing');
            $('.error').slideToggle(0, 'swing');
            $('.error').slideToggle(1000, 'swing');
            errorSet = true;

            $(".error").css("display", "block");
            $('.error').html(message);

            setTimeout(function () {
                $('.error').stop();
                $('.error').slideToggle(1000, 'swing');
                errorSet = false;
            }, 6000);

        } else
        {
            $('.error').stop();
            $('.error').slideToggle(1000, 'swing');
            $('.error').slideToggle(1000, 'swing');
            $('.error').html(message);
        }
    } else if (type == "validation")
    {
        if (validSet === false)
        {
            if (errorSet)
            {
                $('.error').stop();
                $('.error').slideToggle(1000, 'swing');
            }
            if (successSet)
            {
                $('.success').stop();
                $('.success').slideToggle(1000, 'swing');
            }

            $('.validation').slideToggle(0, 'swing');
            $('.validation').slideToggle(0, 'swing');
            $('.validation').slideToggle(1000, 'swing');
            validSet = true;

            $(".validation").css("display", "block");
            $('.validation').html(message);

            setTimeout(function () {
                $('.validation').stop();
                $('.validation').slideToggle(1000, 'swing');
                validSet = false;
            }, 6000);
        } else
        {
            $('.validation').stop();
            $('.validation').slideToggle(1000, 'swing');
            $('.validation').slideToggle(1000, 'swing');
            $('.validation').html(message);
        }
    }

}

//A Web Crypto API function to calculate the hash of a contract using SHA-256
async function sha256(str) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(str));
    return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
}

function headerFooterFormatting(doc, totalPages)
{
    var text;

    for (var i = totalPages; i >= 1; i--)
    {
        for (var i = totalPages; i >= 1; i--)
        {
            if (i == 3)
            {
                text = "Audit";
            } else if (i == 2)
            {
                text = "Signatures"
            } else
            {
                text = "Money Loan Agreement";
            }

            doc.setPage(i);
            //header
            header(doc, text);

            footer(doc, i, totalPages);
            if (i == 1)
            {
                uploadPDF = btoa(doc.output());
                publicKey = localStorage.getItem("publicKey");
                privateKey = encrypt.getPrivateKey();

                //alert(publicKey);
                // publicKey = publicKey.replace(/ /g, "/");
                //alert("Private " + publicKey);
                encrypt.setPublicKey(publicKey);
                encrypt.setPrivateKey(privateKey);

                //Digital Signature - Calculated by encrypting the hash of the contract with RSA
                digitalSignature = encrypt.encrypt(hash);

                $.ajax({
                    url: "http://d00192082.alwaysdata.net/TutumServer/uploadContract.php",
                    method: "POST",
                    data: {contract: contract, privateKey: privateKey, digitalSignature: digitalSignature, data: uploadPDF, user1: sessionStorage.getItem("lenderName"), user2: sessionStorage.getItem("borrowerName"), user1Email: sessionStorage.getItem("user1Email"), user2Email: sessionStorage.getItem("user2Email")},
                    success: function (data)
                    {
                        console.log(data);
                        if (data == "Contract sent successfully")
                        {
                            popUp("Contract generated successfully! You will be redirected shortly...", "success");

                            setTimeout(function () {
                                window.location.href = "index.html";
                            }, 2000);
                        } else
                        {
                            popUp("There has been an error generating your contract, please try again", "error");
                            clicked = false;
                        }
                    }
                });
            }
            doc.page++;
        }
    }
    ;
}


function header(doc, text)
{
    doc.setFontSize(30);
    doc.setTextColor(40);
    doc.setFontStyle('Calibri');

    //if (base64Img) {
    //    doc.addImage(base64Img, 'PNG', margins.left, 10, 40, 40);
    //}

    doc.text(text, margins.left + 65, 50);
    doc.setLineCap(2);
    doc.line(3, 70, margins.width + 43, 70); // horizontal line
}
;

// You could either use a function similar to this or pre convert an image with for example http://dopiaza.org/tools/datauri
// http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
function imgToBase64(url, callback, imgVariable) {

    if (!window.FileReader) {
        callback(null);
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            imgVariable = reader.result.replace('text/xml', 'image/jpeg');
            callback(imgVariable);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
}
;

function footer(doc, pageNumber, totalPages) {

    var str = "Page " + pageNumber + " of " + totalPages;

    doc.setFontSize(10);
    doc.text(str, margins.left, doc.internal.pageSize.height - 20);

    if (base64Img) {
        doc.addImage(base64Img, 'PNG', 115, 900, 480, 160);
    }

}
;



//Upload contract, private key and digital signature to the database
async function uploadContract(contract)
{
    //Hash of Contract - Calculated using the SHA256 hashing algorithm
    hash = await sha256(contract);




    imgToBase64('images/tutum_down.png', function (base64) {
        base64Img = base64;
    });

    margins = {
        top: 70,
        bottom: 40,
        left: 30,
        width: 550
    };

    var pdf = new jsPDF('p', 'pt', 'a4');

    pdf.setFontSize(60);
    pdf.fromHTML(document.getElementById('contract'),
            margins.left, // x coord
            margins.top,
            {
                // y coord
                width: margins.width// max width of content on PDF
            }, function (dispose) {

        headerFooterFormatting(pdf, pdf.internal.getNumberOfPages());
    },
            margins);

    //var iframe = document.createElement('iframe');
    //iframe.setAttribute('style', 'position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
    //document.body.appendChild(iframe);

    //iframe.src = pdf.output('datauristring');


//    alert("test1 " + uploadPDF);
//        $.ajax({
//            method: "POST",
//            url: "upload.php",
//            data: {data: uploadPDF, pdfName: "name"},
//        }).done(function (data) {
//            console.log(data);
//        });

    //pdf.save('sample-file.pdf');  


//    $(function () {
//
//        var specialElementHandlers = {
//            '#editor': function (element, renderer) {
//                return true;
//            }
//        };
//        $('#cmd').click(function () {
//            var doc = new jsPDF();
//            doc.fromHTML(
//                    $('#html-2-pdfwrapper').html(), 15, 15,
//                    {'width': 170, 'elementHandlers': specialElementHandlers},
//                    function () {
//                        doc.save('sample-file.pdf');
//                    }
//            );
//
//        });
//    }); 

    //Public and Private Keys - Used by the encrypt object to encrypt/decrypt
    //var publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC2R6Ooa8NM4TcG/rfyvKQWuRi9hi2AE1I/kceV3nw17DpCPk9mmvLaAus0ulgj3PIok2Phi3GhPGDJ5DaS1yX7YE6rKjvHm1ULXJiqUw8vEl37Va2cocmROidEqktqPcQXa58SoB5yzm/M9oEeUDUGGN/rfIbrCldTHb5TwR96ZQIDAQAB";
    //console.log(publicKey);                                               //qWW8dMr8mqvXQ3qbPAmu0RjxoZVI47tvskYlFAXOf0sPrhO2nUuooJngnHV0639iTTEYG1vckNaW2R6U5QTdQ5Rq5u+uV3pMk7w7Vs4n3urQ6jnqt2rTXbC1DNa

    publicKey = localStorage.getItem("publicKey");
    privateKey = encrypt.getPrivateKey();

    //alert(publicKey);
    // publicKey = publicKey.replace(/ /g, "/");
    //alert("Private " + publicKey);
    encrypt.setPublicKey(publicKey);
    encrypt.setPrivateKey(privateKey);

    //Digital Signature - Calculated by encrypting the hash of the contract with RSA
    digitalSignature = encrypt.encrypt(hash);

    //Testing
    // alert("Contract = " + contract);
    // alert("Hash = " + hash);
    //publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHikastc8+I81zCg/qWW8dMr8mqvXQ3qbPAmu0RjxoZVI47tvskYlFAXOf0sPrhO2nUuooJngnHV0639iTTEYG1vckNaW2R6U5QTdQ5Rq5u+uV3pMk7w7Vs4n3urQ6jnqt2rTXbC1DNa/PFeAZatbf7ffBBy0IGO0zc128IshYcwIDAQAB";
    // alert("Private Key = " + privateKey);

    // alert("Digital Signature = " + digitalSignature);

    console.log(digitalSignature);

    //alert(sessionStorage.getItem("user1Email"));

    //Upload Contract to Database - Uploads the contract, private key (for later decryption) and digital signature to the database
}

//Get the contract and upload it
$(window).on("load", function () {

    var canvasLender = $("#canvasLender").get(0);
    var canvasBorrower = $("#canvasBorrower").get(0);

    $(canvasLender).on('vmouseup', function (e) {
        isSignLender = true;

        e.preventDefault();
        return false;
    });

    $(canvasBorrower).on('vmouseup', function (e) {
        isSignBorrower = true;

        e.preventDefault();
        return false;
    });
//
});

function mainMouseDownOne() {
    $(".main").one('mousedown', '.button-agr', function (e) {
        $('.button-agr').one("click", function ()
        {
            e.preventDefault();
            //First, disable the button
            $(".button-agr").attr("disabled", "disabled");
            $("#lenderRemove").html("");
            $("#borrowerRemove").html("");
            contract = document.getElementById('contract');
            contract = contract.textContent;

            uploadContract(contract);
        });
    });
}

$(".button-agr").click(function (e) {
    if (isSignBorrower === true && isSignLender === true)
    {
        $(".button-agr").prop("disabled", true);
        if (clicked == false)
        {
            //First, disable the button
            $("#lenderRemove").html("");
            $("#borrowerRemove").html("");
            contract = document.getElementById('contract');
            contract = contract.textContent;

            uploadContract(contract);
            e.preventDefault();
            clicked = true;
        }
    } else
    {
        popUp("Please sign your signatures", "error");
        clicked = false;
    }
});

