$(document).ready(function () {
	   localStorage.setItem('barcodetotal', $('#barcodetotal').val().trim());
	var barcodeamount = 120000;
   var amountPaid = barcodeamount*localStorage.getItem('barcodetotal');
	$('#amount').append(12);
   // document.getElementById('amount').innerHTML = amountPaid;

   $('#payforBarcodes').on('click', function(e){
   	debugger
   $.ajax({

        url: "http://83.136.248.89:1701/gTins/number/"+numberofBarcodes,
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        success: function (result) {
                  alert(result.message);
                  window.location.href="requestbarcodes.html"
          
        }
    })

   });
});