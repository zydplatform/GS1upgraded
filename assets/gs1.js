$(document).ready(function () {
  // token check
  $('#tokencheck').hide();
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
              (usernameValue.length > 100)) {
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
          // debugger
            e.preventDefault();     
            validateUsername();
            validatePassword();

        if ((usernameError == true && passwordError == true))
        {
            return true;
        }

        else{
          let username = $('#userName').val().trim();
          let password = $('#password').val().trim();   

            $.ajax({
                url: "http://localhost:1701/authenticate",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                  "userName" : username,
                  "password" : password
                }), 
                success: function( result ) {
                  debugger
                   let token = result.jwt;
                   let user = result.userName;
                   let userResponse = result.response;
                   let userMessage = result.message;
                   localStorage.setItem('myToken', token);
                   localStorage.getItem('myToken');
                   console.log(localStorage.getItem('myToken'))
                   
                   if(localStorage.getItem('myToken') == "null"){
                   $('#tokencheck').show();    
                      
                      return false;
                   }
                   else{
                    window.location.href ="views/clientdashboard.html";
                   }
                   }
               
            })
          }

          });

        //Active user token
        const token = localStorage.getItem('myToken');
        console.log(token);
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

                url: "http://localhost:1701/businessProfiles",
                type: "POST",
                dataType: "json",
                Accept : 'application/json',
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                headers:{
                        'Authorization': $`Bearer ${token}`   
                       },
                data: JSON.stringify({
                  "businessName" : businessName,
                  "businessOwnerShip" : businessOwnerShip,
                  "businessEmail" : businessEmail,
                  "registrationNumber" : registrationNumber
                }), 
                success: function( result ) {
                  debugger
                   console.log(result)

                   }
               
            })

          });
        //get all business profiles

        // var table = $(".display tbody");
        // 'Authentication' => `Bearer ${token}`



        $.ajax({
        url: "http://localhost:1701/businessProfiles/all",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        cache: false,
        contentType: "application/json",
        headers: {
            "Authentication" : $`Bearer ${token}`
        },
        success: function (result) {    
          console.log(result);
         
        }
    });

        //get single business profile

        //add country
        $("#addcountry").on('click', function (e) {
            let countryName = $('#countryName').val().trim();
            let countryCode = $('#countryCode').val().trim();

            e.preventDefault();
            $.ajax({

                url: "http://localhost:1701/countries",
                type: "POST",
                dataType: "json",
                crossDomain: true,
                cache: false,
                headers:{
                    'Authorization': 'Bearer '+localStorage.getItem('myToken')
                },
                contentType: 'application/json',
                data: JSON.stringify({
                  "countryCode" : countryCode,
                  "countryName" : countryName
                }), 
                success: function( result ) {
                   console.log(result)

                   }
               
            })

          });
        //get country
                   

        $.ajax({
        url: 'http://localhost:1701/countries/all',
        type: "GET",
        dataType: "json",
        crossDomain: true,
        cache: false,
        headers: {
            "Authentication" : $`Bearer ${token}`
        },
        dataType: 'json',
        success: function (result) {
          // console.log(result);
         
        }
    });

        //add business line
      $("#addbusinessline").on('click', function (e) {
            let code = $('#code').val().trim();
            let businessLineName = $('#businessLineName').val().trim();
           

            e.preventDefault();
            $.ajax({

                url: "http://localhost:1701/businessLines",
                type: "POST",
                dataType: "json",
                crossDomain: true,
                cache: false,
                headers:{
                    "Authentication" : $`Bearer ${token}`
                },
                contentType: 'application/json',
                data: JSON.stringify({
                  "code" : code,
                  "businessLineName" : businessLineName
                }), 
                success: function( result ) {
                   console.log(result)

                   }
               
            })

          });
        //get business line


        $.ajax({
        url: 'http://localhost:1701/businessLines/all',
        type: "GET",
        dataType: "json",
        cache: false,
        crossDomain: true,
        headers: {
            "Authentication" : $`Bearer ${token}`
        },
        dataType: 'json',
        success: function (result) {
          // console.log(result);
         
        }
    });
        //add business type
$("#addbusinesstype").on('click', function (e) {
            let code = $('#code').val().trim();
            let type = $('#type').val().trim();
           

            e.preventDefault();
            $.ajax({

                url: "http://localhost:1701/businessTypes",
                type: "POST",
                dataType: "json",
                crossDomain: true,
                cache: false,
                headers:{
                    "Authentication" : $`Bearer ${token}`
                },
                contentType: 'application/json',
                data: JSON.stringify({
                  "code" : code,
                  "type" : type
                }), 
                success: function( result ) {
                   console.log(result)

                   }
               
            })

          });
        //get business type

        $.ajax({
        url: 'http://localhost:1701/businessTypes/all',
        type: "GET",
        dataType: "json",
        crossDomain: true,
        cache: false,
        headers: {
            "Authentication" : $`Bearer ${token}`
        },
        dataType: 'json',
        success: function (result) {
          // console.log(result);
         
        }
    });
        //add district
        $("#adddistrict").on('click', function (e) {
            let districtCode = $('#districtCode').val().trim();
            let districtName = $('#districtName').val().trim();
           

            e.preventDefault();
            $.ajax({

                url: "http://localhost:1701/districts",
                type: "POST",
                dataType: "json",
                crossDomain: true,
                cache: false,
                headers:{
                    "Authentication" : $`Bearer ${token}`
                },
                contentType: 'application/json',
                data: JSON.stringify({
                  "districtCode" : districtCode,
                  "districtName" : districtName
                }), 
                success: function( result ) {
                   console.log(result)

                   }
               
            })

          });

        //get district

        $.ajax({
        url: 'http://localhost:1701/districts/all',
        type: "GET",
        dataType: "json",
        crossDomain: true,
        cache: false,
        headers: {
            "Authentication" : $`Bearer ${token}`
        },
        dataType: 'json',
        success: function (result) {
          // console.log(result);
         
        }
    });

        //add business owners

        //get business owners

        //add item caatalogue
      $("#addproduct").on('click', function (e) {
            let itemCode = $('#itemCode').val().trim();
            let itemName = $('#itemName').val().trim();
           

            e.preventDefault();
            $.ajax({

                url: "http://localhost:1701/itemCatelogues",
                type: "POST",
                dataType: "json",
                crossDomain: true,
                cache: false,
                headers:{
                    "Authentication" : $`Bearer ${token}`
                },
                contentType: 'application/json',
                data: JSON.stringify({
                  "itemCode" : itemCode,
                  "itemName" : itemName
                }), 
                success: function( result ) {
                   console.log(result)

                   }
               
            })

          });

        //get all item catalogue


        $.ajax({
        url: 'http://localhost:1701/itemCatelogues/all',
        type: "GET",
        dataType: "json",
        crossDomain: true,
        cache: false,
        headers: {
            "Authentication" : $`Bearer ${token}`
        },
        dataType: 'json',
        success: function (result) {
          console.log(result);
         
        }
    });

        //add business contacts

        //get business contacts

        //add business products

        //get business products

        //add business product barcodes

        //get business product barcodes


        



//logout
$('#logout').on('click', function (e) {
  debugger
  e.preventDefault();
  localStorage.removeItem('myToken');
  if(localStorage.getItem('myToken') ==null){
    window.location.href ="../index.html";
  }

});


















// end of document
      });
