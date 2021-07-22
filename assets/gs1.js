$(document).ready(function () {
 //Validate Username
    $('#usercheck').hide();    
    let usernameError = true;
    $('#userName').keyup(function () {
        validateUsername();
    });
      
    function validateUsername() {
      let usernameValue = $('#userName').val().trim();
      if (usernameValue.length == '') {
      $('#usercheck').show();
          usernameError = false;
          return false;
      } 
      else if((usernameValue.length < 3)|| 
              (usernameValue.length > 20)) {
          $('#usercheck').show();
          $('#usercheck').html
("length of username must be between 3 and 20");
          usernameError = false;
          return false;
      } 
      else {
          $('#usercheck').hide();
      }
    }
      
   // Validate Password
    $('#passcheck').hide();
    let passwordError = true;
    $('#password').keyup(function () {
        validatePassword();
    });
    function validatePassword() {
        let passwrdValue = 
            $('#password').val().trim();
        if (passwrdValue.length == '') {
            $('#passcheck').show();
            passwordError = false;
            return false;
        } 
        if ((passwrdValue.length < 6)|| 
            (passwrdValue.length > 20)) {
            $('#passcheck').show();
            $('#passcheck').html
("length of your password must be between 6 and 20");
            $('#passcheck').css("color", "red");
            passwordError = false;
            return false;
        } else {
            $('#passcheck').hide();
        }
    }
       
  //login user to get token
        $("#submit").on('click', function (e) {
                        
            debugger
            validateUsername();
            validatePassword();
        if ((usernameError == true && passwordError == true)){
            return true;
        }
          let username = $('#userName').val().trim();
          let password = $('#password').val().trim();   
          e.preventDefault();     
            $.ajax({

                url: "http://83.136.248.89:1701/authenticate",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                  "userName" : username,
                  "password" : password
                }), 
                success: function( result ) {
                   let token = result.jwt;
                   let user = result.userName;
                   let userResponse = result.response;
                   let userMessage = result.message;
                   localStorage.setItem('myToken', token);
                   const activeToken = localStorage.getItem('myToken');
                   console.log(activeToken);
                   if(token == null){
                      return false;
                   }
                   else{
                    window.location.href ="views/clientdashboard.html";
                   }
                   }
               
            })

          });

        //register new user 

        //register new business profile
    $("#addbusiness").on('click', function (e) {
            let businessName = $('#businessName').val().trim();
            let businessOwnerShip = $('#businessOwnerShip').val().trim();
            let physicalAdress = $('#physicalAdress').val().trim();
            let businessEmail = $('#businessEmail').val().trim();
            let registrationNumber = $('#registrationNumber').val().trim();
            let tinNumber = $('#tinNumber').val().trim();
            let postalAdress = $('#postalAdress').val().trim();

            e.preventDefault();
            $.ajax({

                url: "http://83.136.248.89:1701/businessProfiles",
                type: "POST",
                headers:{
                    'Authorization': 'Bearer '+token,
                },
                contentType: 'application/json',
                data: JSON.stringify({
                  "businessName" : businessName,
                  "businessOwnerShip" : businessOwnerShip,
                  "businessEmail" : businessEmail,
                  "registrationNumber" : registrationNumber
                }), 
                success: function( result ) {
                   console.log(result)

                   }
               
            })

          });
        //get all business profiles

        $('#dataTable1').dataTable({  
                "ajax": {  
                    "url": "http://83.136.248.89:1701/businessProfiles/all",  
                    "type": "GET",  
                    "datatype": "json"
                },  
                "columns": [  
                    { "data": "businessName" },  
                    { "data": "businessEmail" },  
                    { "data": "businessOwnerShip" },  
                    { "data": "registrationNumber" },  
                    { "data": "tinNumber" }  
                ]  
            });  

        //get single business prpfile

        //add country

        //get country

        //add business line

        //get business line

        //add business type

        //get business type

        //add district

        //get district

        //add business owners

        //get business owners

        //add item caatalogue

        //get all item catalogue

        //add business contacts

        //get business contacts

        //add business products

        //get business products

        //add business product barcodes

        //get business product barcodes


        





















// end of document
      });
