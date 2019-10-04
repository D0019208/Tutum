//Steps of verifying the contract
//
//STEP 1: GET THE DIGITAL SIGNATURE AND CONTRACT FROM DATABASE
//STEP 2: DECRYPT THE DIGITAL SIGNATURE TO GET THE HASH
//STEP 3: HASH THE CONTRACT YOU GOT FROM THE DATABASSE
//STEP 4: COMPARE THE 2 HASHES  
window.isphone = false;
if (document.URL.indexOf("http://") === -1
        && document.URL.indexOf("https://") === -1) {
    window.isphone = true;
}

if (window.isphone) {
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
    onDeviceReady();
}

function onDeviceReady() {
    $(document).ready(function () {
        var decrypt = new JSEncrypt();
        var count;
        var contract;
        var digitalSignature;
        var changedContracts = [];
        var warningSet = false;
        var contractChanged = false;

        function isJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }

        $(".warning").click(function ()
        {
            if (warningSet == true)
            {
                $('.warning').slideToggle(1000, 'swing');
                warningSet = false;
            }
        });

        function popUp(message) {
            if (warningSet === false)
            {
                $('.warning').slideToggle(0, 'swing');
                $('.warning').slideToggle(0, 'swing');
                $('.warning').slideToggle(1000, 'swing');
                warningSet = true;

                $(".warning").css("display", "block");
                $('.warning').html(message);

                setTimeout(function () {
                    if (warningSet == true)
                    {
                        $('.warning').stop();
                        $('.warning').slideToggle(1000, 'swing');
                        warningSet = false;
                    }
                }, 6000);
            } else
            {
                $('.warning').stop();
                $('.warning').slideToggle(1000, 'swing');
                $('.warning').slideToggle(1000, 'swing');
            }
        }

        //A Web Crypto API function to calculate the hash of a contract using SHA-256    
        async function sha256(str) {
            const buf = await crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(str));
            return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
        }

        //Check if there has been a change to the contract
        async function checkHash(contract, foreignHash, contract_id, i)
        {
            var localHash = await sha256(contract);


            //alert("Local Hash = " + localHash);
            //alert("Foreign Hash = " + foreignHash);

            if (foreignHash !== localHash)
            {
                //alert("Change to contract detected!");
                contractChanged = true;

                changedContracts.push(i + 1);

            }

            if (contractChanged == true)
            {
                if (i == count - 1)
                {
                    if(localStorage.getItem("language") == "English")
                    {
                        popUp("An unauthorised change has been detected to contract " + changedContracts.toString() + ". They are now null and void.");
                    }
                    else if(localStorage.getItem("language") == "Russian")
                    {
                         popUp("В контракте номер " + changedContracts.toString() + " было обнаружено несанкционированное изменение. Теперь они недействительны.");
                    }
                }
            }
        }

        //Get the ammount of contracts a user has
        $.ajax({

            url: "http://d00192082.alwaysdata.net/TutumServer/contractCount.php",
            method: "POST",
            data: {email: localStorage.getItem("loginEmail")},
            success: function (data)
            {
                count = data;

            }
        });

        //Get the details of the contract from the database then check for any change
        $.ajax({
            url: "http://d00192082.alwaysdata.net/TutumServer/readContract.php",
            method: "POST",
            data: {email: localStorage.getItem("loginEmail")},
            success: function (data)
            {
                if (data === null)
                {
                    popUp("No data recieved from the server");
                }

                if (isJsonString(data) == false)
                {
                    popUp("Failed to verify contracts");
                }
                var contractInfo = JSON.parse(data);

                for (let i = 0; i < count; i++)
                {
                    contract = contractInfo[i].details;
                    //alert(contract);
                    digitalSignature = contractInfo[i].digitalSignature;

                    decrypt.setPrivateKey(contractInfo[i].privateKey);
                    //decrypt.setPublicKey();

                    //alert("Digital Signature " + digitalSignature);

                    var foreignHash = decrypt.decrypt(digitalSignature);
                    //alert("tt " + foreignHash);
                    var contract_id = contractInfo[i].contract_id;
                    checkHash(contract, foreignHash, contract_id, i);
                }
            }
        });

        $('.isa_warning').unbind('click');

        $(".isa_warning").click(function ()
        {
            $('.isa_warning').slideToggle(1000, 'swing');
            warningSet = false;
        });


        var language;
        $.ajax({
            url: 'http://d00192082.alwaysdata.net/TutumServer/languages/' + localStorage.getItem('language') + '.json',
            dataType: 'json', async: false,
            success: function (lang) {
                language = lang;

                $('#contract1').text(language.contract1);
                $('#contract2').text(language.contract2);
                $('#contract3').text(language.contract3);
                $('#contract4').text(language.contract4);
                $('#contract5').text(language.contract5);
                $('#contract6').text(language.contract6);
            }});


    });
}