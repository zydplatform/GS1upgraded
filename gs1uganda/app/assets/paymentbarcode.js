$(document).ready(function () {
	var numberofBarcodes = localStorage.getItem("numberofBarcodes");
	var amount = numberofBarcodes*20000;
	$('#amountBank').val(amount);
	// mobileAmount
	$('#mobileAmount').val(amount);
	// Bank payforBarcodes
	$("#payforBarcodes").on('click', function (e) {
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
                  console.log(result.message);
                  window.location.href="requestbarcodes.html"
          
        }
    })
});

	//mobile money pay for barcodes

		$("#payforBarcodes1").on('click', function (e) {
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
                  console.log(result.message);
                  window.location.href="requestbarcodes.html"
          
        }
    })
});
});