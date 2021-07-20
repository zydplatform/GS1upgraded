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

                   console.log(token);

                   }
               
            })

          });

        //register new user 

        //register new business profile
    $("#register").on('click', function (e) {
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

                   console.log(token);

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
