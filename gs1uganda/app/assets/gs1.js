$(document).ready(function () {
       var businessName;
          var businessOwnerShip;
          var physicalAdress;
          var businessEmail;
          var registrationNumber;
          var tinNumber;
          var businesslines;
          var business ;
          var postalAdress ;
          var natureofbusiness;
          var businesssector;
          var password;
          var confirmPassword;

          // contact person info
          var firstName;
          var lastName;
          var phoneNumber;
          var email;
   

  var $table=$('#table');
  var $codeTable = $('#codeTable');
  // alert messages
         $("#success-alert").hide();
          $('#success-code').hide();
          $('#success-newuser').hide();
 //included html files
 var includes = $('[data-include]');
  $.each(includes, function () {
    var file =  $(this).data('include') + '.html'
    $(this).load(file)
  })
  // token check
  $('#tokencheck').hide();
   $('#applicationCodecheck').hide();
   $('#showPasscode').hide();
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
                  if(result.response ==true){
                     let token = result.jwt;
                   let user = result.userName;
                   let userResponse = result.response;
                   let userMessage = result.message;
                   localStorage.setItem('myToken', token);
                   localStorage.getItem('myToken');
                   localStorage.setItem('showname', user);
                   localStorage.getItem('showname');
                   console.log(localStorage.getItem('myToken'))
                   var showname = result.userName;
                  $('#showname').append(showname);
                   
                   if(localStorage.getItem('myToken') == "null"){
                   $('#tokencheck').show();    
                      
                      return false;
                   }
                   else{
                     $.ajax({
                  url: 'http://83.136.248.89:1701/logedinuserprofile',
                  type: "GET",
                  dataType: "json",
                  headers: {
                      "Authorization" : 'Bearer '+localStorage.getItem('myToken')
                  },
                  dataType: 'json',
                  success: function (result) {
                    if(result.status == true){
                      localStorage.setItem('mybusinessId', result.data.id);
                      localStorage.setItem('businessName', result.data.businessName);
                      $('#companyName').append(localStorage.getItem('businessName'))
                      window.location.href ="views/clients/mydashboard.html";
                    }
                    else{
                      window.location.href ="views/clients/welcome.html";
                    }
                  }
                });

                   

                   }

                  }else{
                    // alert(result.message);
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

                     
                    // window.location.href ="verificationcode.html";
                    
                     // $("#success-alert").html(emailCode).fadeIn("slow");
                     //  $('#success-alert').delay(5000).fadeOut('slow');

                     console.log(emailCode);
                     // $('#showPasscode').show().innerText(emailCode);
                     $("#success-alert").show();
                     $('#myModal').modal('show');
                     // alert(emailCode)
                   
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
                       $('#success-code').show();
                       $('#verifyModal').modal('show');
                    }
                    else
                    {
                      // alert("client not verified")
                    }
                    });
        //register new user 
          $("#registerClient").on('click', function (e) {
            // debugger
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
                    $("#success-newuser").show();
                     $('#registerModal').modal('show');
                    
                  }
                  else{
                    // alert("client not succesfully registered");
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
        // headers: {
        //     "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        // },
        dataType: 'json',
        success: function (result) {
          // var count = result.data.length;
          console.log(result.data);
          for (var d in result.data) {
           var countryData = result.data[d];    
          $('#country').append('<option value="' + countryData.id + '">' + countryData.countryName + '</option>');     
          $('#countrycode').append('<option value="' + countryData.id + '">' + countryData.countryName + '</option>');                    
        }
        }
    });


//select units of measure
 $.ajax({
        url: 'http://83.136.248.89:1701/measurementUnits/all',
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
           var netContentUOMData = result.data[d];    
          $('#netContentUOM').append('<option value="' + netContentUOMData.code + '">' + netContentUOMData.name + '</option>');     
          // $('#netContentUOM').append('<option value="' + netContentUOMData.id + '">' + netContentUOMData.name + '</option>');                    
        }
        }
    });

//select business types
// businessTypeMappings

 $.ajax({
        url: 'http://83.136.248.89:1701/businessTypes/all',
        type: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        // },
        dataType: 'json',
        success: function (result) {
          // var count = result.data.length;
          console.log(result.data);
          for (var d in result.data) {
           var businesstypeData = result.data[d];         
          $('#selecttype').append('<option value="' + businesstypeData.id + '">' + businesstypeData.type + '</option>');                      
        }
                // const mybusinesstypeId = businesstypeData.id;
                // localStorage.setItem('mybusinesstypeId',mybusinesstypeId);
                // alert(mybusinesstypeId)
        }
    });

 //select business lines
// businessLineMappings
 $.ajax({
        url: 'http://83.136.248.89:1701/businessLines/all',
        type: "GET",
        dataType: "json",
        // headers: {
        //     "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        // }

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
         
         // $('#companyName').append(data.businessName);
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

      //add business products
      $("#addbusinessproduct").on('click', function (e) {
        debugger
            let itemCatelogueId = $('#ProductClassification').val().trim();
            let itemDescription = $('#itemDescription').val().trim();
            let itemName = $('#itemName').val().trim();
            let brandName = $('#brandName').val().trim();
           // let usageDescription = $('#usageDescription').val().trim();
          let netContent = $('#netContent').val().trim();
          // let unitDescriptor = $('#unitDescriptor').val().trim();
          let netContentUOM = $('#netContentUOM').val().trim();
          // let effectiveDate = $('#effectiveDate').val().trim();
          // let country = $('#country').val().trim();

            e.preventDefault();
            var myData = JSON.stringify({
                    "itemCatelogue":{"id":itemCatelogueId},
                    "itemName": itemName,
                  "itemDescription":itemDescription,
                  "netContentUOM":netContentUOM,
                   "netContent":netContent,
                    "brandName":brandName
                });
            console.log(myData);
            $.ajax({

                url: "http://83.136.248.89:1701/businessProducts/logedInCompany",
                type: "POST",
                dataType: "json",
                headers:{'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    "Authorization" : 'Bearer '+localStorage.getItem('myToken')
                },
                contentType: 'application/json',
                data: myData, 
                success: function( result ) {
                  // alert(result);
                   console.log(result);

                   }
               
            })

          });
  // var table = document.getElementById('businessproductsTable');
  //          for(var i = 1; i < table.rows.length; i++)
  //               {
  //                   table.rows[i].onclick = function()
  //                   {
  //                        //rIndex = this.rowIndex;
                         
  //                   };
  //               }

   // $("#businessproductsTable").on('click',"button.generateBarcodes", function (e) {
   //      alert('working')
      
   //      var data = $("#businessproductsTable").row({selected:true}).data();
   //      alert(data);

   //      alert('getSelections: ' + JSON.stringify($("#table").bootstrapTable('getSelections')));
     
   //        var productId = document.getElementById('productId').value();
   //        alert(productId);
   //          e.preventDefault();
   //          $.ajax({

   //              url: "http://83.136.248.89:1701/businessProductCodes",
   //              type: "POST",
   //              dataType: "json",
   //              headers:{'Accept': 'application/json',
   //                      'Content-Type': 'application/json',
   //                  "Authorization" : 'Bearer '+localStorage.getItem('myToken')
   //              },
   //              contentType: 'application/json',
   //                              data: JSON.stringify({
   //                                "businessProduct":{"id": productId},
                                 
   //              }), 
   //              success: function( result ) {
   //                 console.log(result)

   //                 }
               
   //          })

   //        });

      //get business productsCatalogue
      $.ajax({
        url: "http://83.136.248.89:1701/itemCatelogues/all",
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
           var productData = result.data[d];         
          $('#ProductClassification').append('<option value="' + productData.id + '">' + productData.itemName + '</option>');                      
        }
            
        }
    });
//get business productsCatalogue code
      $.ajax({
        url: "http://83.136.248.89:1701/businessProductCodes/businessProfile/"+localStorage.getItem('businessId'),
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
          var data = result.data[d];
          $('#businesscodesTable tbody').append($('<tr>')
              .append($('<td>', { text: data.businessName }))
              .append($('<td>', { text: data.barcodeType }))
              .append($('<td>', { text: data.activationStatus }))
              .append($('<td>', { text: data.unitDescriptor }))
              .append($('<td>', {html:'<button class="btn btn-sm btn-warning">update</button><button class="btn btn-sm btn-danger">delete</button>'}))
          )
       }

        if(result.status ==true ){
          var countProducts = result.data.length;
          // alert(countProducts);
                  $('#countProducts').append(countProducts);
     
        }else{
          $('#countProducts').append(0);
        }
          
        }
    });

      //get logged in user product
       $.ajax({
        url: "http://83.136.248.89:1701/businessProducts/loggedinuser",
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        dataType: 'json',
        success: function (result) {

          // var count = result.data.length;
          console.log(result.data);
          var tableData = [];
          var count =0;
          for (var d in result.data) {
            var data = result.data[d];
            var mydata ={
                    "id":data.id ,
                    "itemName" : data.itemCatelogue.itemName ,
                    "itemDescription": data.itemDescription,
                    "netContent":data.netContent,
                    "brandName" :  data.brandName ,
                    "netContentUOM":data.netContentUOM
                     }
                     tableData.push(mydata);
                     

        }
        console.log(tableData.length);
        if(result.status == true){
          var countItems = result.data.length;
                  $('#countItems').append(countItems);
      //   $('table').bootstrapTable({
      //   data: tableData
      // });
        $table.bootstrapTable('append', tableData)

        }else{
          $('#countItems').append(0);
        }
            }

    });

      //user barcodes

       //get logged in user product
       $.ajax({
        url: "http://83.136.248.89:1701/businessProductCodes/loggedinuser",
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        dataType: 'json',
        success: function (result) {       var tableCodeData = [];
          var count =0;
          for (var d in result.data) {
            var codedata = result.data[d];
            var mycodedata ={
                    "id":codedata.id ,
                    "itemCode": codedata.businessProduct.itemCatelogue.itemCode,
                    "itemName" : codedata.businessProduct.itemCatelogue.itemName,
                    "itemDescription": codedata.businessProduct.itemDescription,
                    "targetMarket":"---",
                    "brandName" :  codedata.businessProduct.brandName ,
                    "unitDescriptor":codedata.businessProduct.unitDescriptor,
                    "effectiveDate": codedata.businessProduct.effectiveDate,
                    "productScope":codedata.businessProduct.productScope,
                    "usageDescription":codedata.businessProduct.usageDescription,
                    "countryOfOrigin":"---",
                    "barcodeType":codedata.barcodeType,
                    "barcode":codedata.barcode,
                    "gtin":codedata.gtin,
                    "gpccode":codedata.gpccode

                     }
                     tableCodeData.push(mycodedata);
                     

        }
        console.log(tableCodeData.length)
      
      // window
        $codeTable.bootstrapTable('append', tableCodeData)
    
    }

    });

       // show data for product

         
      

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
        //generate barcodes
         $("#barcode").on('click', function (e) {
          // var $table = $('table');
           // alert('getSelections: ' + JSON.stringify($table.bootstrapTable('getSelections')))
           var productData = $table.bootstrapTable('getSelections');
           // alert(productData[0].id)
             $.ajax({

                url: "http://83.136.248.89:1701/businessProductCodes",
                type: "POST",
                dataType: "json",
                headers:{'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    "Authorization" : 'Bearer '+localStorage.getItem('myToken')
                },
                contentType: 'application/json',
                                data: JSON.stringify({
                                  "businessProduct":{"id": productData[0].id},
                                 
                }), 
                success: function( result ) {
                   // console.log(result)
                   // alert(result.message)
                   // window.location.href = "barcodepaymentoptions.html"

                   }
               
            })

          });
        
        // select product to generate barcode image

         //generate barcodes
         $("#selectbarcode").on('click', function (e) {
          // alert("working")
            var productData = $codeTable.bootstrapTable('getSelections');
            // alert(JSON.stringify(productData));
           var codeId = productData[0].id;
        localStorage.setItem('mycodeId',codeId);
        
        // window.location.href ="printbusinessbarcodes.html";
        // if()
           

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
      debugger
          localStorage.setItem('businessName', $('#businessName').val().trim());
          localStorage.setItem('businessOwnerShip',$('#businessOwnerShip').val().trim());
          localStorage.setItem('physicalAdress', $('#physicalAdress').val().trim());
          localStorage.setItem('businessEmail', $('#businessEmail').val().trim());
          localStorage.setItem('registrationNumber', $('#registrationNumber').val().trim());
          localStorage.setItem('tinNumber', $('#tinNumber').val().trim());
          localStorage.setItem('country',$('#country').val().trim());
          localStorage.setItem('natureofbusiness', $('#selectline').val().trim());
          localStorage.setItem('businesssector',$('#selecttype').val().trim());
          localStorage.setItem('password', $('#password').val().trim());          
          localStorage.setItem('confirmPassword',$('#confirmPassword').val().trim());
          // alert(businessName);
          window.location.href ="registercontactperson.html";
          
            // e.preventDefault();
            // $.ajax({

            //     url: "http://83.136.248.89:1701/userbusinessProfiles",
            //     type: "POST",
            //     dataType: "json",
            //     headers:{
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json',
            //             'Authorization': 'Bearer '+localStorage.getItem('myToken')   
            //            },
            //     data: JSON.stringify({
            //       "businessName" : businessName,
            //       "businessOwnerShip" : businessOwnerShip,
            //       "businessEmail" : businessEmail,
            //       "registrationNumber" : registrationNumber,
            //       "physicalAdress" : physicalAdress,
            //       "postalAdress" : postalAdress,
            //       "tinNumber" : tinNumber

            //     }), 
            //     success: function( result ) {
            //       // debugger
            //        console.log(result)
            //        const businessId = result.data;
            //        localStorage.setItem('businessId', businessId);
            //        localStorage.getItem('businessId');
            //        // console.log(localStorage.getItem('businessId'))
            //        // alert('business created'+localStorage.getItem('businessId'));
            //        window.location.href="clientbusinessowners.html";
            //        }
               
            // })

          });
     $("#contactperson").on('click', function (e) {
      debugger
      localStorage.setItem('firstName',$('#firstName').val().trim());
      localStorage.setItem('lastName', $('#lastname').val().trim());
      localStorage.setItem('phoneNumber', $('#phoneno').val().trim());
      localStorage.setItem('email', $('#email').val().trim());
          // alert(localStorage.getItem('tinNumber'));
           window.location.href ="clientpayment.html";
       });
     // activate
     $("#activationcode").on('click', function (e) {
      debugger
      var businessAccount = { "businessName":localStorage.getItem('businessName'),
"businessEmail":localStorage.getItem('businessEmail'),
"businessOwnerShip":localStorage.getItem('businessOwnerShip'),
"registrationNumber":localStorage.getItem('registrationNumber'),
"tinNumber":localStorage.getItem('tinNumber'),
"physicalAdress":localStorage.getItem('physicalAdress'),
   "country":{"id":localStorage.getItem('country')},
   "district":{"id":localStorage.getItem('district')}, 

  "businessSectors":[{"id":localStorage.getItem('businesssector')}],
 "natureOfbusinesses":[{"id":localStorage.getItem('natureofbusiness')}],

 "contactPerson":{
"firstName":localStorage.getItem('firstName'),
   "lastName":localStorage.getItem('lastName'),
   "phoneNumber":localStorage.getItem('phoneNumber'),
   "email":localStorage.getItem('email')
 }
}
var business = JSON.stringify(businessAccount);
console.log(business);

$.ajax({

                url: "http://83.136.248.89:1701/membershipapplication",
                type: "POST",
                dataType: "json",
                // headers:{'Accept': 'application/json',
                //         'Content-Type': 'application/json',
                //     'Authorization': 'Bearer '+localStorage.getItem('myToken')
                // },
                contentType: 'application/json',
                data: business,
                success: function( result ) {
                   console.log(result)
                   if(result.status == true){
                    alert("Data set succesfully");
                    window.location.href="approval.html";
                   }

                   }
               
            })

}

      );

//logout
$('#logout').on('click', function (e) {
  debugger
  e.preventDefault();
  localStorage.removeItem('businessId'); 
  localStorage.removeItem('mybusinessId');
  localStorage.removeItem('mycodeId'); 
  localStorage.removeItem('myToken');
  localStorage.removeItem('showname');
  if(localStorage.getItem('showname') == null && localStorage.getItem('myToken') ==null && localStorage.getItem('businessId') == null && localStorage.getItem('mycodeId')== null && localStorage.getItem('mybusinessId')== null ){
    window.location.href ="../../login.html";
  }

});


















// end of document
      });
