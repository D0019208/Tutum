$(window).on("load", function () {
    var url = "http://d00192082.alwaysdata.net/TutumServer/auth.php";
    var errorSet = false;
    var successSet = false;
    var validSet = false;

    if (localStorage.getItem("language") == null)
    {
        localStorage.setItem("language", "English");
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }




    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

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

    //Login Function
    $("#login").click(function () {
        var email = $("#email").val();
        var password = $("#password").val();

        var dataString = "email=" + email + "&password=" + password + "&login=";
        if ($.trim(email).length > 0 & $.trim(password).length > 0)
        {
            $.ajax({
                type: "POST",
                url: url,
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function () {
                    $("#login").html('Connecting...');
                },
                success: function (data) {
                    console.log(data);
                    if (data != "failed")
                    {
                        var response = JSON.parse(data);
                        localStorage.setItem("login", "true");
                        localStorage.setItem("loginEmail", email);
                        localStorage.setItem("userId", response[0].user_id);
                        localStorage.setItem("publicKey", response[0].publicKey);
                        localStorage.setItem("privateKey", response[0].privateKey);
                        localStorage.setItem("fullName", response[0].fullName);



                        popUp("Login Successful, you will be redirected shortly", "success");

                        setTimeout(function () {
                            window.location.href = "index.html";
                        }, 2000);


                    } else if (data = "failed")
                    {
                        localStorage.login = "false";

                        popUp("The username or password are incorrect.", "error")

//
//                            $('.isa_error').slideToggle(0, 'swing');
//                            $('.isa_error').slideToggle(500, 'swing');
//                            $(".isa_error").html("<i class='fa fa-times-circle'></i>Please fill in all fields.");
//
//                        
//
//                            $(".isa_error").click(function () {
//                                 $('.isa_error').stop(true).slideToggle();
//                            });

                        $("#login").html('Login');
                    }

                }
            });
        } else
        {

            if ($.trim(email).length === 0 || $.trim(password).length === 0)
            {
                popUp("Please fill in all the required fields first", "validation");
            }
        }
        return false;

    });

    //signup function
    $("#signup").click(function (e) {
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var country = $("#country").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();
        var DOB = $("#DOB").val();
        var mobile = $("#mobile").val();
        var address = $("#address").val();
        var encrypt = new JSEncrypt({default_key_size: 1024});
        var publicKey = encrypt.getPublicKey();
        var privateKey = encrypt.getPrivateKey();

        var dataString = "firstName=" + firstName + "&lastName=" + lastName + "&country=" + country +
                "&email=" + email + "&password=" + password + "&confirmPassword=" + confirmPassword +
                "&DOB=" + DOB + "&mobile=" + mobile + "&address=" + address + "&publicKey=" + publicKey + "&privateKey=" + privateKey + "&signup=";



        if ($.trim(firstName).length > 0 && $.trim(lastName).length > 0 && $.trim(country).length > 0
                && $.trim(email).length > 0 && $.trim(password).length > 0 && $.trim(confirmPassword).length > 0
                && $.trim(DOB).length > 0 && $.trim(mobile).length > 0 && $.trim(privateKey).length > 0 && $.trim(address).length > 0 && $.trim(password) === $.trim(confirmPassword))
        {
            if (validateEmail(email))
            {

                $.ajax({
                    type: "POST",
                    url: url,
                    data: dataString,
                    crossDomain: true,
                    cache: false,
                    beforeSend: function () {
                        $("#signup").val('Connecting...');
                    },
                    success: function (data) {
                        console.log(data);
                        if (data == "success")
                        {
                            popUp("Registration successful! Please wait...", "success");
                            $(location).attr('href', 'login.html');

                        }
                        if (data == "exist")
                        {
                            popUp("The email you have entered has already been registered, please try again", "error");
                            $("#signup").val('Register');
                            e.preventDefault();
                        }
                        if (data == "failed")
                        {
                            popUp("There has been an error registering your account, please try again", "error")
                            $("#signup").val('Register');
                            e.preventDefault();
                        }
                    }
                });
            } else
            {
                popUp(email + " is not a valid email address", "error");
                e.preventDefault();
            }





            return false;
        } else
        {

            if ($.trim(firstName).length === 0 || $.trim(lastName).length === 0 || $.trim(country).length === 0
                    || $.trim(email).length === 0 || $.trim(password).length === 0 || $.trim(confirmPassword).length === 0
                    || $.trim(DOB).length === 0 || $.trim(mobile).length === 0 || $.trim(address).length === 0)
            {
                popUp("Please fill in all the fields first", "validation");
                e.preventDefault();

            } else if ($.trim(password) !== $.trim(confirmPassword))
            {
                popUp("Password and confirm password do not match", "validation");
                e.preventDefault();
            }

        }
    });


    //Change Password
//    $("#change_password").click(function(){
//    	var email=localStorage.email;
//    	var old_password=$("#old_password").val();
//    	var new_password=$("#new_password").val();
//    	var dataString="old_password="+old_password+"&new_password="+new_password+"&email="+email+"&change_password=";
//    	if($.trim(old_password).length>0 & $.trim(old_password).length>0)
//		{
//			$.ajax({
//				type: "POST",
//				url: url,
//				data: dataString,
//				crossDomain: true,
//				cache: false,
//				beforeSend: function(){ $("#change_password").val('Connecting...');},
//				success: function(data){
//					if(data=="incorrect")
//					{
//						alert("Your old password is incorrect");
//					}
//					else if(data="success")
//					{
//						alert("Password Changed successfully");
//					}
//					else if(data="failed")
//					{
//						alert("Something Went wrong");
//					}
//				}
//			});
//		}return false;
//
//    });

    //Forget Password
//    $("#forget_password").click(function(){
//    	var email=$("#email").val();
//    	var dataString="email="+email+"&forget_password=";
//    	if($.trim(email).length>0)
//		{
//			$.ajax({
//				type: "POST",
//				url: url,
//				data: dataString,
//				crossDomain: true,
//				cache: false,
//				beforeSend: function(){ $("#forget_password").val('Connecting...');},
//				success: function(data){
//					if(data=="invalid")
//					{
//						alert("Your have not registered with us");
//					}
//					else if(data="success")
//					{
//						alert("we have sent password to your email address, please check");
//					}
//				}
//			});
//		}return false;
//
//    });


    //logout function
    $("#logout").click(function () {
        localStorage.login = "false";
        window.location.href = "login.html";
    });

    //Displaying user email on home page
    $("#emai1").html(localStorage.email);
    // var imageHash="http://www.gravatar.com/avatar/"+md5(localStorage.email);
    //$("#profilepic").attr('src',imageHash);
});