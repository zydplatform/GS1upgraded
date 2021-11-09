$(document).ready(function () {
$tablebarcode =$('#tablebarcodes');
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
                  window.location.href="clientpayforbarcodes.html"
          
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

                    console.log(result.data);
          var tableDataBarcodes = [];
          var count =0;
          for (var d in result.data) {
            var data = result.data[d];
            var mydata ={
                    "gtin":data.gtin ,
                    "barcodeType" : data.barcodeType ,
                    "activationStatus":data.activationStatus
                     }
                     tableDataBarcodes.push(mydata);
                     

        }
        console.log(tableDataBarcodes.length);
        if(result.status == true){
          var countBarcodes = result.data.length;
                  $('#countBarcodes').append(countBarcodes);
      //   $('table').bootstrapTable({
      //   data: tableData
      // });
        $tablebarcode.bootstrapTable('append', tableDataBarcodes)

        }else{
          $('#countBarcodes').append(0);
        }
                  // console.log(JSON.stringify(result.data));
      //             var tableDataBarcodes = [];
      //               for (var x in result.data) {
      //     var dataforbarcodes = result.data[x];
      //     $('#tablebarcodes tbody').append($('<tr>')
      //         .append($('<td>', { text: dataforbarcodes.gtin }))
      //         .append($('<td>', { text: dataforbarcodes.barcodeType }))
      //         .append($('<td>', { text: dataforbarcodes.activationStatus }))
      //         // .append($('<td>', {html:'<button class="btn btn-sm btn-warning">update</button><button class="btn btn-sm btn-danger">delete</button>'}))
      //     )
      //  }
      //   if(result.status == true){
      //     var countBarcodes = result.data.length;
      //             $('#countBarcodes').append(countBarcodes);
      // //   $('table').bootstrapTable({
      // //   data: tableData
      // // });
      //   $table.bootstrapTable('append', tableData)

      //   }else{
      //     $('#countBarcodes').append(0);
      //   }
          
        }
    })

// select Barcodes
// gtin
 $.ajax({
        url: 'http://83.136.248.89:1701/gTins/loggedinuser',
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        dataType: 'json',
        success: function (result) {
           // alert(result.data);
            for (var d in result.data) {
           var barcodesData = result.data[d];         
          $('#selectgtin').append('<option value="' + barcodesData.gtin + '">' + barcodesData.gtin + '</option>');                      
        }

         
        }
    });
           var productData = $table.bootstrapTable('getSelections');
         
// function expiryDays(date_string) {
//   var b = date_string.split(/\D/);
//   var expiry = new Date(b[2],--b[0],b[1]);
//   return Math.round((expiry - new Date().setHours(0,0,0,0)) / 8.64e7);
// }
// const now = new Date();
// alert(now.getTime())

});


