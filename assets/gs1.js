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
        $("#form1").on('submit', function (e) {
          // debugger
            e.preventDefault();     
            validateUsername();
            validatePassword();

        if ((usernameError == true && passwordError == true))
        {
            return true;
        }

        else{debugger
          let userName = $('#userName').val().trim();
          let password = $('#password').val().trim();   

            $.ajax({
                url: "http://83.136.248.89:1701/authenticate",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                  "userName" : userName,
                  "password" : password
                }), 
                success: function( result ) {
                  
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
// "Authorization" : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE2Mjc5NDUzNDgsImlhdCI6MTYyNzkwOTM0OH0.UwbFrqWN0xF8gkCFHT_iR10BJUJnCIf4X0LmMZKvkM4'
         //get district

        $.ajax({
        url: 'http://83.136.248.89:1701/districts/all',
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        dataType: 'json',
        success: function (result) {
          console.log(result);
          // $('#myTable tr').empty();
          for (var d in result.data) {
          var data = result.data[d];
          $('#myTable tbody').append($('<tr>')
              .append($('<td>', { text: data.districtCode }))
              .append($('<td>', { text: data.districtName }))
              .append($('<td>', {html:'<button class="btn btn-sm btn-warning">update</button><button class="btn btn-sm btn-danger">delete</button>'}))
          )
       }
         
        }
    });


//get all item catalogue


        $.ajax({
        url: 'http://83.136.248.89:1701/itemCatelogues/all',
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        dataType: 'json',
        success: function (result) {
          console.log(result);
          var countItems = result.data.length;
          $('#countItems').append(countItems);
          // $('#prodTable tr').empty();
          for (var d in result.data) {
          var data = result.data[d];
          $('#prodTable tbody').append($('<tr>')
              .append($('<td>', { text: data.itemCode }))
              .append($('<td>', { text: data.itemName }))
              .append($('<td>', {html:'<button class="btn btn-sm btn-warning">update</button><button class="btn btn-sm btn-danger">delete</button>'}))
          )
       }
         
        }
    });


//get business type

        $.ajax({
        url: 'http://83.136.248.89:1701/businessTypes/all',
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        dataType: 'json',
        success: function (result) {
          console.log(result);
          // $('#businesstypeTable tr').empty();
          for (var d in result.data) {
          var data = result.data[d];
          $('#businesstypeTable tbody').append($('<tr>')
              .append($('<td>', { text: data.code }))
              .append($('<td>', { text: data.type }))
              .append($('<td>', {html:'<button class="btn btn-sm btn-warning">update</button><button class="btn btn-sm btn-danger">delete</button>'}))
          )
       }
         
        }
    });


  //get business line


        $.ajax({
        url: 'http://83.136.248.89:1701/businessLines/all',
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        dataType: 'json',
        success: function (result) {
          console.log(result);
          // $('#businesslineTable tr').empty();
          for (var d in result.data) {
          var data = result.data[d];
          $('#businesslineTable tbody').append($('<tr>')
              .append($('<td>', { text: data.code }))
              .append($('<td>', { text: data.businessLineName }))
              .append($('<td>', {html:'<button class="btn btn-sm btn-warning">update</button><button class="btn btn-sm btn-danger">delete</button>'}))
          )
       }
         
        }
    });



//get country
                   

        $.ajax({
        url: 'http://83.136.248.89:1701/countries/all',
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        dataType: 'json',
        success: function (result) {
          // var count = result.data.length;
          console.log(result);
          // $('#count').append(count);countBusiness
         // $('#countryTable tr').empty();
          for (var d in result.data) {
          var data = result.data[d];
          $('#countryTable tbody').append($('<tr>')
              .append($('<td>', { text: data.countryCode }))
              .append($('<td>', { text: data.countryName }))
              .append($('<td>', {html:'<button class="btn btn-sm btn-warning">update</button><button class="btn btn-sm btn-danger">delete</button>'}))
          )
       }
        }
    });
       

$.ajax({
        url: "http://83.136.248.89:1701/businessProfiles/all",
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        success: function (result) {    
          console.log(result);
          var countBusiness = result.data.length;
          $('#countBusiness').append(countBusiness);
          // $('#businessTable tbody').empty();
       
          for (var d in result.data) {
          var data = result.data[d];
          $('#businessTable tbody').append($('<tr>')
              .append($('<td>', { text: data.businessName }))
              .append($('<td>', { text: data.businessEmail }))
              .append($('<td>', { text: data.businessOwnerShip }))
              .append($('<td>', { text: data.registrationNumber }))
              .append($('<td>', {html:'<button class="btn btn-sm btn-warning">update</button><button class="btn btn-sm btn-danger">delete</button>'}))
          )
       }
         
        }
    });



 //add item caatalogue
      $("#addproduct").on('click', function (e) {
            let itemCode = $('#itemCode').val().trim();
            let itemName = $('#itemName').val().trim();
           

            e.preventDefault();
            $.ajax({

                url: "http://83.136.248.89:1701/itemCatelogues",
                type: "POST",
                dataType: "json",
                headers:{'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    "Authorization" : 'Bearer '+localStorage.getItem('myToken')
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

      //add district
        $("#adddistrict").on('click', function (e) {
            let districtCode = $('#districtCode').val().trim();
            let districtName = $('#districtName').val().trim();
           

            e.preventDefault();
            $.ajax({

                url: "http://83.136.248.89:1701/districts",
                type: "POST",
                dataType: "json",
                headers:{'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    "Authorization" : 'Bearer '+localStorage.getItem('myToken')
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

    //add business type
$("#addbusinesstype").on('click', function (e) {
            let code = $('#code').val().trim();
            let type = $('#type').val().trim();
           

            e.preventDefault();
            $.ajax({

                url: "http://83.136.248.89:1701/businessTypes",
                type: "POST",
                dataType: "json",
                headers:{'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    "Authorization" : 'Bearer '+localStorage.getItem('myToken')
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


//add business type
$("#addbusinessowner").on('click', function (e) {
            let firstName = $('#firstName').val().trim();
            let lastname = $('#lastname').val().trim();
            let telephone = $('#telephone').val().trim();
            let email = $('#email').val().trim();
           

            e.preventDefault();
            $.ajax({

                url: "http://83.136.248.89:1701/businessOwners",
                type: "POST",
                dataType: "json",
                headers:{'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    "Authorization" : 'Bearer '+localStorage.getItem('myToken')
                },
                contentType: 'application/json',
                data: JSON.stringify({
                  "firstName":firstName,
                  "lastname":lastname,
                  "telephone":telephone,
                  "email":email
                }), 
                success: function( result ) {
                   console.log(result)

                   }
               
            })

          });


//add business line
      $("#addbusinessline").on('click', function (e) {
            let code = $('#code').val().trim();
            let businessLineName = $('#businessLineName').val().trim();
           

            e.preventDefault();
            $.ajax({

                url: "http://83.136.248.89:1701/businessLines",
                type: "POST",
                dataType: "json",
                headers:{'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    "Authorization" : 'Bearer '+localStorage.getItem('myToken')
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


  //add country
        $("#addcountry").on('click', function (e) {
            let countryName = $('#countryName').val().trim();
            let countryCode = $('#countryCode').val().trim();

            e.preventDefault();
            $.ajax({

                url: "http://83.136.248.89:1701/countries",
                type: "POST",
                dataType: "json",
                headers:{'Accept': 'application/json',
                        'Content-Type': 'application/json',
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
                dataType: "json",
                headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+localStorage.getItem('myToken')   
                       },
                data: JSON.stringify({
                  "businessName" : businessName,
                  "businessOwnerShip" : businessOwnerShip,
                  "businessEmail" : businessEmail,
                  "registrationNumber" : registrationNumber
                }), 
                success: function( result ) {
                  // debugger
                   console.log(result)

                   }
               
            })

          });
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
