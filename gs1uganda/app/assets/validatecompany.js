$(document).ready(function() {
  $("form[name='registration']").validate({
  	errorClass: "error fail-alert",
    validClass: "valid success-alert",
    rules: {
      businessName : {
        required: true,
        minlength: 3
      },
      registrationNumber: {
        required: true,
        number: true,
        min: 10
      },
      businessEmail: {
        required: true,
        email: true
      },
      tinNumber: {
        required: true,
        number: true,
        min: 5
      },
            physicalAdress: {
        required: true,
      },
            country: {
        required: true,
      },
            businessOwnerShip: {
        required: true,
      },
      selectline: {
        required: true,
      },
      selecttype: {
        required: true,
      },
            password: {
        required: true,
        minlength: 6,
      }
    },
    messages : {
      businessName: {
        minlength: "Name should be at least 3 characters"
      },
      registrationNumber: {
        required: "Please enter your age",
        number: "Please enter your age as a numerical value",
        min: "You must be at least 18 years old"
      },
      businessEmail: {
        email: "The email should be in the format: abc@domain.tld"
      },
      tinNumber: {
        required: "People with age over 50 have to enter their weight",
        number: "Please enter your weight as a numerical value"
      }
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
});




