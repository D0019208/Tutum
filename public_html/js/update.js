$(document).ready(function () {
    var oldFlag = $('option:selected');
    localStorage.setItem("oldFlag", oldFlag.val());

    if (localStorage.getItem("language") !== null && localStorage.getItem("flag") !== null)
    {
        $("#countries_title").html(localStorage.getItem("language"));
        $("#countries_title").prepend("<img src='images/msdropdown/icons/blank.gif' class='flag " + localStorage.getItem("flag") + " fnone'>");
    } else
    {
        localStorage.setItem("language", "English");
        localStorage.setItem("flag", "uk");
        
        $("#countries_title").html(localStorage.getItem("language"));
        $("#countries_title").prepend("<img src='images/msdropdown/icons/blank.gif' class='flag " + localStorage.getItem("flag") + " fnone'>");
    }

    if (localStorage.getItem("language") !== null)
    {
        var new_selection = $(this).find('option:selected');
        var language = document.querySelectorAll('option[value="' + localStorage.getItem("language") + '"]');
        $('.selected').removeClass('selected');

        $("ul li:contains('" + localStorage.getItem("language") + "')").addClass("selected");

    }


    $(document).on("change", "#countries", function () {


        var new_selection = $(this).find('option:selected');


        localStorage.setItem("language", new_selection.html());
        localStorage.setItem("flag", new_selection.val());


        //new_selection[0].setAttribute("selected", true); new_selection.attr("selected", true);
        $("#countries_title").html(localStorage.getItem("language"));
        $("#countries_title").prepend("<img src='images/msdropdown/icons/blank.gif' class='flag " + localStorage.getItem("flag") + " fnone'>");

    });

    var firstName;
    var lastName;
    var password;
    var confirmPassword;
    var email;
    var country;
    var address;
    var birth;
    var errorSet = false;
    var successSet = false;
    var validSet = false;

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    $("#DOB").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: "-118:+0"
    });

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
        }
        if (type == "error")
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
        }
        if (type == "validation")
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

    $(document).on('click', '#submit-change', function (e) // If the user clicks anywhere then the option box will disapear.
    {
        firstName = $("#firstName").val();
        lastName = $("#lastName").val();
        password = $("#password").val();
        confirmPassword = $("#confirmPassword").val();
        email = $("#email").val();
        country = $("#country").val();
        address = $("#address").val();
        birth = $("#DOB").val();

        if (firstName.length > 0 && lastName.length > 0 && password.length > 0 && confirmPassword.length > 0
                && email.length > 0 && country.length > 0 && address.length > 0 && birth.length > 0 && password === confirmPassword)
        {
            if (validateEmail(email))
            {
                alert(localStorage.getItem("loginEmail"));
                $.ajax({
                    type: "POST",
                    url: "http://d00192082.alwaysdata.net/TutumServer/updateUser.php",
                    data: {userEmail: localStorage.getItem("loginEmail"), firstName: firstName, lastName: lastName, password: password, email: email, country: country, address: address, birth: birth},
                    crossDomain: true,
                    cache: false,
                    beforeSend: function () {
                        $("#submit-change").val('Connecting...');
                    },
                    success: function (data) {
                        if (data == "Updated successfully!")
                        {
                            popUp("You have successfully updated your account!", "success");
                            $("#submit-change").val('Submit Changes');
                            setTimeout(function () {
                                window.location.href = "index.html";
                            }, 2000);

                        } else if (data == "Cannot change user information as the email you have entered already exists")
                        {
                            popUp("Cannot change user information as the email you have entered already exists", "error");
                            $("#submit-change").val('Submit Changes');
                        } else if (data == "An error has occured!")
                        {
                            popUp("There has been an error updating your account, please try again", "error");
                            $("#submit-change").val('Submit Changes');
                        } else
                        {
                            popUp("There has been an error updating your account, please try again", "error");
                            $("#submit-change").val('Submit Changes');
                        }
                    }
                });
            } else
            {
                popUp(email + " is not a valid email address", "error");
                e.preventDefault();
            }
        } else
        {
            if (firstName.length === 0 || lastName.length === 0 || password.length === 0 || confirmPassword.length === 0
                    || email.length === 0 || country.length === 0 || address.length === 0 || birth.length === 0)
            {
                popUp("Please fill in all the fields first", "validation");
            } else if (password !== confirmPassword)
            {
                popUp("Password and confirm password do not match", "validation");
            }
        }

        //$("#form").submit();
    });
});