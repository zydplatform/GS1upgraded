$(document).ready(function () {
$tablebarcode =$('#tablebarcodes');
$assignedbarcodes = $('#assignedbarcodes')
	// barcoderequest
$("#barcoderequest").on('click', function (e) {
    debugger
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
                  window.location.href="requestbarcodes.html"
          
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
              
          
        }
    })


//show assigned barcodes to products
$.ajax({

        url: "http://83.136.248.89:1701/productBarcodeAllocations/loggedinuser",
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        success: function (result) {
            debugger
            // alert(result.message)
                    console.log(result);
          var tableassignBarcodes = [];
          var count =0;
          for (var x in result.data) {
            var assigndata = result.data[x];
            var assigned ={
                    "itemName":assigndata.businessProduct.itemCatelogue.itemName,
                    "itemDescription":assigndata.businessProduct.itemDescription,
                    "gtin":assigndata.businessGTin.gtin ,
                    "barcodeType" : assigndata.businessGTin.barcodeType ,
                    "activationStatus":assigndata.businessGTin.activationStatus
                     }
                     tableassignBarcodes.push(assigned);
                     

        }
        console.log(tableassignBarcodes.length);
        if(result.status == true){
        $assignedbarcodes.bootstrapTable('append', tableassignBarcodes)

        }
              
          
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
          $('#selectgtin').append('<option value="' + barcodesData.id + '">' + barcodesData.gtin + '</option>');                      
        }

         
        }
    });
           var productData = $table.bootstrapTable('getSelections');
 
document.getElementById('mobileAmount').innerHTML =1200;
});


