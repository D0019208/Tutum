$(window).on("load", function() {
//
//    contract = document.getElementById('contract');
//    contract = contract.textContent;
//    
//    var filledContract = contract.replace(/LENDERNAME/g, sessionStorage.getItem("lenderName"));
//    alert(filledContract);
//    document.getElementById('contract').innerHTML = filledContract;
//
    var elements = document.getElementsByTagName('p');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var replacedText = text.replace(/LENDERNAME/gi, sessionStorage.getItem("lenderName")).replace(/LOANAMOUNT/gi, sessionStorage.getItem("loanAmount")).replace(/BORROWERNAME/gi, sessionStorage.getItem("borrowerName")).replace(/INTERESTAMOUNT/gi, sessionStorage.getItem("interest")).replace(/DATEBEGINS/gi, sessionStorage.getItem("loanStartDate")).replace(/DATEEND/gi, sessionStorage.getItem("loanEndDate")).replace(/COUNTY/gi, sessionStorage.getItem("county"));

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}
});