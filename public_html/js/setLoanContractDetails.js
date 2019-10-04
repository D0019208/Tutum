$(document).ready(function () {
    var lenderName;
    var loanAmount;
    var borrowerName;
    var interest;
    var loanStartDate;
    var loanRepaidBy;
    var lenderEmail;
    var borrowerEmail;
    var county;
    var errorSet = false;
    var successSet = false;
    var validSet = false;
    var language;

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }



    $.ajax({
        url: 'http://d00192082.alwaysdata.net/TutumServer/languages/' + localStorage.getItem('language') + '.json',
        dataType: 'json', async: false,
        success: function (lang) {
            language = lang;

            document.getElementById('lenderName').placeholder = language.lenderFullName;
            document.getElementById('lenderEmail').placeholder = language.lenderEmail;
            document.getElementById('loanAmount').placeholder = language.loanAmmount;
            document.getElementById('borrowerName').placeholder = language.lenderFullName;
            document.getElementById('borrowerEmail').placeholder = language.borrowerEmail;
            document.getElementById('county').placeholder = language.county;
            document.getElementById('interest').placeholder = language.interest;
            document.getElementById('loanStartDate').placeholder = language.loanStartDate;
            document.getElementById('loanEndDate').placeholder = language.loanEndDate;

            $('#modalLenderFullNameTitle').text(language.lenderFullName);
            $('#modalLenderEmailTitle').text(language.lenderEmail);
            $('#modalLoanAmountTitle').text(language.loanAmmount);
            $('#modalBorrowerFullNameTitle').text(language.lenderFullName);
            $('#modalBorrowerEmailTitle').text(language.borrowerEmail);
            $('#modalCountyTitle').text(language.county);
            $('#modalInterestTitle').text(language.interest);
            $('#modalLoanStartDateTitle').text(language.loanStartDate);
            $('#modalLoanEndDateTitle').text(language.loanEndDate);

            $('#modalLenderFullName').text(language.modalLenderFullName);
            $('#modalLenderEmail').text(language.modalLenderEmail);
            $('#modalLoanAmount').text(language.modalLoanAmount);
            $('#modalBorrowerFullName').text(language.modalBorrowerFullName);
            $('#modalBorrowerEmail').text(language.modalBorrowerEmail);
            $('#modalCounty').text(language.modalCounty);
            $('#modalInterest').text(language.modalInterest);
            $('#modalLoanStartDate').text(language.modalLoanStartDate);
            $('#modalLoanEndDate').text(language.modalLoanEndDate);

            $('#modalLenderFullNameExample').text(language.modalLenderFullNameExample);
            $('#modalLenderEmailExample').text(language.modalLenderEmailExample);
            $('#modalLoanAmountExample').text(language.modalLoanAmountExample);
            $('#modalBorrowerFullNameExample').text(language.modalBorrowerFullNameExample);
            $('#modalBorrowerEmailExample').text(language.modalBorrowerEmailExample);
            $('#modalCountyExample').text(language.modalCountyExample);
            $('#modalInterestExample').text(language.modalInterestExample);
            $('#modalLoanStartDateExample').text(language.modalLoanStartDateExample);
            $('#modalLoanEndDateExample').text(language.modalLoanEndDateExample);

        }});


    $(".error").click(function ()
    {
        if (errorSet == true)
        {
            $('.error').slideToggle(1000, 'swing');
            errorSet = false;
        }
    });

    $(".success").click(function ()
    {
        if (successSet == true)
        {
            $('.success').slideToggle(1000, 'swing');
            successSet = false;
        }
    });

    $(".validation").click(function ()
    {
        if (validSet == true)
        {
            $('.validation').slideToggle(1000, 'swing');
            validSet = false;
        }
    });

    function popUp(message, type) {
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
                    if (successSet == true)
                    {
                        $('.success').stop();
                        $('.success').slideToggle(1000, 'swing');
                        successSet = false;
                    }
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
                    if (errorSet == true)
                    {
                        $('.error').stop();
                        $('.error').slideToggle(1000, 'swing');
                        errorSet = false;
                    }
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
                    if (validSet == true)
                    {
                        $('.validation').stop();
                        $('.validation').slideToggle(1000, 'swing');
                        validSet = false;
                    }
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

    $(document).on('click', '.button-agr', function (e) // If the user clicks anywhere then the option box will disapear.
    {
        lenderName = $("#lenderName").val();
        lenderEmail = $("#lenderEmail").val();
        borrowerEmail = $("#borrowerEmail").val();
        loanAmount = $("#loanAmount").val();
        borrowerName = $("#borrowerName").val();
        interest = $("#interest").val();
        loanStartDate = $("#loanStartDate").val();
        loanRepaidBy = $("#loanEndDate").val();
        county = $("#county").val();

        if (lenderName.length === 0 || lenderEmail.length === 0 || borrowerEmail.length === 0 || loanAmount.length === 0
                || borrowerName.length === 0 || interest.length === 0 || loanStartDate.length === 0 || loanRepaidBy.length === 0 || county.length === 0)
        {
            popUp("Please fill in all the fields first", "validation");
            e.preventDefault();
        } else
        {
            if (validateEmail(lenderEmail) == true && validateEmail(borrowerEmail) == true)
            {
                sessionStorage.setItem("lenderName", lenderName);
                sessionStorage.setItem("user1Email", lenderEmail);
                sessionStorage.setItem("loanAmount", loanAmount);
                sessionStorage.setItem("borrowerName", borrowerName);
                sessionStorage.setItem("user2Email", borrowerEmail);
                sessionStorage.setItem("interest", interest);
                sessionStorage.setItem("loanStartDate", loanStartDate);
                sessionStorage.setItem("loanEndDate", loanRepaidBy);
                sessionStorage.setItem("county", county);
                $("#form").submit();
            } else
            {
                popUp("The email you have entered for the lender or borrower are of an incorrect format", "validation");
                //e.preventDefault();
            }
        }
    });
});