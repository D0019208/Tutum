var base64Img = null;
imgToBase64('signature.png', function (base64) {
    base64Img = base64;
});

margins = {
    top: 70,
    bottom: 40,
    left: 30,
    width: 550
};

generate = function ()
{
    var pdf = new jsPDF('p', 'pt', 'a4');
    pdf.addHTML($('#disptext')[0], function () {
        //pdf.save('text.pdf');
    });
    pdf.setFontSize(18);
    pdf.fromHTML(document.getElementById('html-2-pdfwrapper'),
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

    var uploadPDF = btoa(pdf.output());
    
    $.ajax({
        method: "POST",
        url: "upload.php",
        data: {data: uploadPDF, pdfName: "name"},
    }).done(function (data) {
        console.log(data);
    });

    //pdf.save('sample-file.pdf');
};
function headerFooterFormatting(doc, totalPages)
{
    for (var i = totalPages; i >= 1; i--)
    {
        doc.setPage(i);
        //header
        header(doc);

        footer(doc, i, totalPages);
        doc.page++;
    }
}
;

function header(doc)
{
    doc.setFontSize(30);
    doc.setTextColor(40);
    doc.setFontStyle('Calibri');

    //if (base64Img) {
    //    doc.addImage(base64Img, 'PNG', margins.left, 10, 40, 40);
    //}

    doc.text("MONEY LOAN AGREEMENT", margins.left + 65, 50);
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

$(function () {

    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };
    $('#cmd').click(function () {
        var doc = new jsPDF();
        doc.fromHTML(
                $('#html-2-pdfwrapper').html(), 15, 15,
                {'width': 170, 'elementHandlers': specialElementHandlers},
                function () {
                    doc.save('sample-file.pdf');
                }
        );

    });
});