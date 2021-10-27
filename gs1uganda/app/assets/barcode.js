$(document).ready(function () {

	// barcoderequest
$("#barcoderequest").on('click', function (e) {
  console.log("hello i need")
  var numberofBarcodes = $("#barcodetotal").val();
   $.ajax({

        url: "http://83.136.248.89:1701/gTins/number/numberofBarcodes",
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        success: function (result) {
                  console.log(result.message);
          
        }
    })

});

});