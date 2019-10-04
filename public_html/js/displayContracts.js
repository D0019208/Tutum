$(window).on("load", function() {
    var url = "http://d00192082.alwaysdata.net/TutumServer/readContract.php"; 
    var email = localStorage.getItem('loginEmail');
    var dataString = "email=" + email;

    $.ajax({
        type: "POST",
        url: url,
        data: dataString,
        crossDomain: true,
        cache: false,
        success: function (data) { 
            var response = JSON.parse(data);
            for (var i = 0; i < response.length; i++)
            {
                
                     $("#listContracts").append("<li><img src='icons/l-m.png'>"+ 
                        (1 + i) + " (Contract ID) <br>" +
                        response[i].type + " (Type)<br>" +
                        response[i].user1Name + ", " + 
                        response[i].user1Email + " (Lender)<br> " +
                        response[i].user2Name+ ", " +
                        response[i].user2Email + " (Borrower)<br></li>");  
            }

        }
    });
}); 