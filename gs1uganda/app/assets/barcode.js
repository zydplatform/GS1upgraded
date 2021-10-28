$(document).ready(function () {

	// barcoderequest
$("#barcoderequest").on('click', function (e) {
  console.log("hello i need")
  var numberofBarcodes = $("#barcodetotal").val();
   $.ajax({

        url: "http://83.136.248.89:1701/gTins/number/"+numberofBarcodes,
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

$.ajax({

        url: "http://83.136.248.89:1701/gTins/loggedinuser",
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        success: function (result) {
                  // console.log(JSON.stringify(result.data));
                    for (var x in result.data) {
          var dataforbarcodes = result.data[x];
          $('#tablebarcodes tbody').append($('<tr>')
              .append($('<td>', { text: dataforbarcodes.gtin }))
              .append($('<td>', { text: dataforbarcodes.barcodeType }))
              .append($('<td>', { text: dataforbarcodes.activationStatus }))
              // .append($('<td>', {html:'<button class="btn btn-sm btn-warning">update</button><button class="btn btn-sm btn-danger">delete</button>'}))
          )
       }
          
        }
    })

});


