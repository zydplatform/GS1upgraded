 $(document).ready(function () {

// alert(localStorage.getItem('mycodeId'))
 $.ajax({
        url: "http://83.136.248.89:1701/businessProductCodes/id/"+localStorage.getItem('mycodeId'),
        type: "GET",
        dataType: "json",
        headers: {
            "Authorization" : 'Bearer '+localStorage.getItem('myToken')
        },
        dataType: 'json',
        success: function (result) {       
         // alert(localStorage.getItem('mycodeId'));
            var showcodedata = result.data;
            console.log(JSON.stringify(showcodedata));
            $('#barcode').val(showcodedata.barcode);
            $('#gtin').val(showcodedata.gtin);
            $('#gpccode').val(showcodedata.gpccode);
            $('#barcodeType').val(showcodedata.barcodeType);
            $('#itemCode').val(showcodedata.businessProduct.itemCatelogue.itemCode);
             $('#itemName').val(showcodedata.businessProduct.itemCatelogue.itemName);
              $('#itemDescription').val(showcodedata.businessProduct.itemCatelogue.itemDescription);
               $('#itemCode').val(showcodedata.businessProduct.itemCatelogue.itemCode);
                $('#brandName').val(showcodedata.businessProduct.brandName);
                 $('#usageDescription').val(showcodedata.businessProduct.usageDescription);
                  $('#unitDescriptor').val(showcodedata.businessProduct.unitDescriptor);
                  $('#effectiveDate').val(showcodedata.businessProduct.effectiveDate);
                  $('#barcodeImage').append($('<img src=http://41.202.233.164:1602/barbecue/ean13/'+showcodedata.barcode+'/>')
             
          )               
            }

    });

});