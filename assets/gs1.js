$(document).ready(function () {

  //login user to get token
        $("#submit").on('click', function (e) {
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
                    'Authorization': 'Bearer ${activeToken}',
                },
                contentType: 'application/json',
                data: JSON.stringify({
                  "businessName" : businessName,
                  "businessOwnerShip" : businessOwnerShip,
                  "physicalAdress" : physicalAdress,
                  "businessEmail" : businessEmail,
                  "registrationNumber" : registrationNumber,
                  "tinNumber" : tinNumber,
                  "postalAdress" : postalAdress
                }), 
                success: function( result ) {
                   console.log(result)
                   }
               
            })

          });
        //get all business profiles

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
