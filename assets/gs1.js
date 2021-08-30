$(document).ready(function () {
 //included html files
 var includes = $('[data-include]');
  $.each(includes, function () {
    var file =  $(this).data('include') + '.html'
    $(this).load(file)
  })
  // token check
  $('#tokencheck').hide();
   $('#applicationCodecheck').hide();
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
      
      /*$("#emailAddress").validate({
          rules: {
            field: {
              required: true,
              email: true
            }
          },
          message: {
            required : "Email is required"
          }

        });*/

        // alert messages
         $("#success-alert").hide();
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
          debugger
            e.preventDefault();     
            validateUsername();
            validatePassword();

        if ((usernameError == true && passwordError == true))
        {
            return true;
        }

        else{
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
                   var showname = result.userName;
                  $('#showname').append(showname);
                   
                   if(localStorage.getItem('myToken') == "null"){
                   $('#tokencheck').show();    
                      
                      return false;
                   }
                   else{
                    window.location.href ="views/clients/welcome.html";

                   }
                   }
               
            })
          }

          });
        //get user name
         $('#user').html("user")

        //Active user token
        const token = localStorage.getItem('myToken');
        console.log(token);
         //email subscription

        $("#emailAddressForm").on('submit', function (e) {
          // debugger
            e.preventDefault();     
               
            let emailAdress = $('#emailAddress').val().trim();
           if(emailAdress !== ""){

            $.ajax({
                url: "http://83.136.248.89:1701/verifyEmail",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                  "emailAdress" : emailAdress
                }), 
                success: function( result ) {
                  
                   let applicationCode = result.data.applicationCode;
                   let status = result.data.status;
                   let email = result.data.emailAdress;
                   let emailMessage = result.message;
                   localStorage.setItem('applicationCode', applicationCode);
                   const emailCode = localStorage.getItem('applicationCode');
                   
                   if(emailCode === "null"){
                    return false;
                   }else{
                    window.location.href ="verificationcode.html";
                    
                     // $("#success-alert").html(emailCode).fadeIn("slow");
                     //  $('#success-alert').delay(5000).fadeOut('slow');

                     alert(emailCode)
                     
                    
                  }
                   
                   }
               
            })
          }
          else{
             $('#applicationCodecheck').show(); 

          }

          });

        //verify Email Code
         $('#verifyEmailCode').on('click',function(){
          // debugger
                      let clientCode = $('#clientCode').val().trim();
                      const emailCode = localStorage.getItem('applicationCode');
                    if(emailCode === clientCode){
                      window.location.href ="registerclient.html";
                    }
                    else
                    {
                      alert("client not verified")
                    }
                    });
        //register new user 
          $("#registerClient").on('click', function (e) {
            debugger
            let firstName = $('#firstName').val().trim();
            let lastName = $('#lastName').val().trim();
            let phoneNumber = $('#phoneNumber').val().trim();
            let emailAdress = $('#emailAdress').val().trim();
            let nationalId = $('#nationalId').val().trim();
            e.preventDefault();
            $.ajax({

                url: "http://83.136.248.89:1701/signup",
                type: "POST",
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify({
                  "firstName" : firstName,
                  "lastName" : lastName,
                  "phoneNumber" : phoneNumber,
                  "emailAdress" : emailAdress,
                  "nationalId" : nationalId
                }), 
                success: function( result ) {
                  if(result.status === true){
                    window.location.href = "../../index.html";
                    alert("client succesfully registered! please login with the password value as password");
                  }
                  else{
                    alert("client not succesfully registered");
                  }

                   }
               
            })

          });

          

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
//select district 
 $.ajax({
        url: 'http://83.136.248.89:1701/districts/all',
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        dataType: 'json',
        success: function (result) {
           // console.log(result.data);
            for (var d in result.data) {
           var districtData = result.data[d];         
          $('#district').append('<option value="' + districtData.districtCode + '">' + districtData.districtName + '</option>');                      
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
getBusinesstypes();
function getBusinesstypes(){
        $.ajax({
        url: "http://83.136.248.89:1701/businessTypeMappings/businessProfile/"+localStorage.getItem('businessId'),
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
              .append($('<td>', { text: data.businessType.code }))
              .append($('<td>', { text: data.businessType.type }))
              .append($('<td>', {html:'<button class="btn btn-sm btn-warning">update</button><button class="btn btn-sm btn-danger">delete</button>'}))
          )
       }
         
        }
    });

}
  //get business line
  getBusinessLine();
function getBusinessLine(){

        $.ajax({
        url: "http://83.136.248.89:1701/businessLineMappings/businessProfile/"+localStorage.getItem('businessId'),
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
              .append($('<td>', { text: data.businessLine.code }))
              .append($('<td>', { text: data.businessLine.businessLineName }))
              .append($('<td>', {html:'<button class="btn btn-sm btn-warning">update</button><button class="btn btn-sm btn-danger">delete</button>'}))
          )
       }
         
        }
    });

}

//select and add country
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
          console.log(result.data);
          for (var d in result.data) {
           var countryData = result.data[d];         
          $('#country').append('<option value="' + countryData.countryCode + '">' + countryData.countryName + '</option>');                      
        }
        }
    });


//select business types
// businessTypeMappings

 $.ajax({
        url: 'http://83.136.248.89:1701/businessTypes/all',
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        dataType: 'json',
        success: function (result) {
          // var count = result.data.length;
          console.log(result.data);
          for (var d in result.data) {
           var businesstypeData = result.data[d];         
          $('#selecttype').append('<option value="' + businesstypeData.id + '">' + businesstypeData.type + '</option>');                      
        }
                const mybusinesstypeId = businesstypeData.id;
                localStorage.setItem('mybusinesstypeId',mybusinesstypeId);
                alert(mybusinesstypeId)
        }
    });

 //select business lines
// businessLineMappings
 $.ajax({
        url: 'http://83.136.248.89:1701/businessLines/all',
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        dataType: 'json',
        success: function (result) {
          // var count = result.data.length;
          console.log(result.data);
          for (var d in result.data) {
           var businesslineData = result.data[d];         
          $('#selectline').append('<option value="' + businesslineData.id + '">' + businesslineData.businessLineName + '</option>');                      
        }
        }
    });

 //get business owners
 getBusinessOwners();
function getBusinessOwners(){
        $.ajax({
        url: "http://83.136.248.89:1701/businessOwners/businessProfile/"+localStorage.getItem('businessId'),
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
          $('#ownersTable tbody').append($('<tr>')
              .append($('<td>', { text: data.firstName }))
              .append($('<td>', { text: data.lastname }))
              .append($('<td>', { text: data.telephone }))
              .append($('<td>', { text: data.email }))
              .append($('<td>', {html:'<button class="btn btn-sm btn-warning">update</button><button class="btn btn-sm btn-danger">delete</button>'}))
          )
       }
         
        }
    });
      }
                   
//get all countries
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
// $("#addbusinesstype").on('click', function (e) {
//             let code = $('#code').val().trim();
//             let type = $('#type').val().trim();
           

//             e.preventDefault();
//             $.ajax({

//                 url: "http://83.136.248.89:1701/businessTypes",
//                 type: "POST",
//                 dataType: "json",
//                 headers:{'Accept': 'application/json',
//                         'Content-Type': 'application/json',
//                     "Authorization" : 'Bearer '+localStorage.getItem('myToken')
//                 },
//                 contentType: 'application/json',
//                 data: JSON.stringify({
//                 "businessProfile": {"id" : localStorage.getItem('businessId')},
//                   "code" : code,
//                   "type" : type
//                 }), 
//                 success: function( result ) {
//                    console.log(result)
//                    alert(result);

//                    }
               
//             })

//           });


//add business type
$("#addbusinesstype").on('click', function (e) {
            let typeId = $('#selecttype').val().trim();
           debugger
            e.preventDefault();
            $.ajax({

                url: "http://83.136.248.89:1701/businessTypeMappings",
                type: "POST",
                dataType: "json",
                headers:{'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    "Authorization" : 'Bearer '+localStorage.getItem('myToken')
                },
                contentType: 'application/json',
                data: JSON.stringify({
                "businessProfile": {"id" : localStorage.getItem('businessId')},
                "businessType" : {"id" : typeId}
                }), 
                success: function( result ) {
                   console.log(result)
                  
                   getBusinesstypes();

                   }
               
            })

          });
//add business owner
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
                  "businessProfile": {"id" : localStorage.getItem('businessId')},
                  "firstName":firstName,
                  "lastname":lastname,
                  "telephone":telephone,
                  "email":email
                }), 
                success: function( result ) {
                   
                   getBusinessOwners();

                   }
               
            })

          });


//add business line
      $("#addbusinessline").on('click', function (e) {
            let lineId = $('#selectline').val().trim();

            e.preventDefault();
            $.ajax({

                url: "http://83.136.248.89:1701/businessLineMappings",
                type: "POST",
                dataType: "json",
                headers:{'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    "Authorization" : 'Bearer '+localStorage.getItem('myToken')
                },
                contentType: 'application/json',
                data: JSON.stringify({
                "businessProfile": {"id" : localStorage.getItem('businessId')},
                "businessLine" : {"id" : lineId}
                }), 
                success: function( result ) {
                   // alert(result.message+localStorage.getItem('businessId'))
                   getBusinessLine();

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
                  "registrationNumber" : registrationNumber,
                  "physicalAdress" : physicalAdress,
                  "postalAdress" : postalAdress,
                  "tinNumber" : tinNumber

                }), 
                success: function( result ) {
                  // debugger
                   console.log(result)
                   const businessId = result.data;
                   localStorage.setItem('businessId', businessId);
                   localStorage.getItem('businessId');
                   // console.log(localStorage.getItem('businessId'))
                   // alert('business created'+localStorage.getItem('businessId'));

                   }
               
            })

          });
//logout
$('#logout').on('click', function (e) {
  debugger
  e.preventDefault();
  localStorage.removeItem('myToken');
  if(localStorage.getItem('myToken') ==null){
    window.location.href ="../../index.html";
  }

});


















// end of document
      });
