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
                  debugger
                   let token = result.jwt;
                   let user = result.userName;
                   let userResponse = result.response;
                   let userMessage = result.message;
                   localStorage.setItem('myToken', token);
                   localStorage.getItem('myToken');
                   console.log(localStorage.getItem('myToken'))
                   
                   if(localStorage.getItem('myToken') == null){
                      return false;
                   }
                   else{
                    window.location.href ="views/clientdashboard.html";
                   }
                   }
               
            })

          });

        //Active user token
        const activeToken = localStorage.getItem('myToken');

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
                    'Authorization': 'Bearer '+activeToken
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

        // var table = $(".display tbody");


        $.ajax({
        url: 'http://83.136.248.89:1701/businessProfiles/all',
        type: "GET",
        headers: {
            'Authorization': $`Bearer ${localStorage.getItem("myToken")}`
        },
        dataType: 'json',
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

                url: "http://83.136.248.89:1701/countries",
                type: "POST",
                headers:{
                    Authorization: 'Bearer '+activeToken
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
        url: 'http://83.136.248.89:1701/countries/all',
        type: "GET",
        headers: {
            'Authorization': 'Bearer '+activeToken
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

                url: "http://83.136.248.89:1701/businessLines",
                type: "POST",
                headers:{
                    'Authorization': 'Bearer '+activeToken
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
        url: 'http://83.136.248.89:1701/businessLines/all',
        type: "GET",
        headers: {
            'Authorization': 'Bearer '+activeToken
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

                url: "http://83.136.248.89:1701/businessTypes",
                type: "POST",
                headers:{
                    'Authorization': 'Bearer '+activeToken
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
        url: 'http://83.136.248.89:1701/businessTypes/all',
        type: "GET",
        headers: {
            'Authorization': 'Bearer '+activeToken
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

                url: "http://83.136.248.89:1701/districts",
                type: "POST",
                headers:{
                    'Authorization': 'Bearer '+activeToken
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
        url: 'http://83.136.248.89:1701/districts/all',
        type: "GET",
        headers: {
            'Authorization': 'Bearer '+activeToken
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

                url: "http://83.136.248.89:1701/itemCatelogues",
                type: "POST",
                headers:{
                    'Authorization': 'Bearer '+activeToken
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
        url: 'http://83.136.248.89:1701/itemCatelogues/all',
        type: "GET",
        headers: {
            'Authorization': 'Bearer '+activeToken
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
  e.preventDefault();
  localStorage.removeItem('myToken');
  if(localStorage.getItem('myToken') ==null){
    window.location.href ="../index.html";
  }

});


















// end of document
      });
