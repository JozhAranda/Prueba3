$(function() {
  $('#submitFine').on('click touch', function(event) {
  
    event.preventDefault();       
    
    var dataFine = $('#formFine').serialize();
    var my_delay = 2000;

    $.ajax({
      method: 'POST',
      url: 'http://soporte.policiatijuana.gob.mx:85/api/Infraccion/',
      async: true,
      crossDomain: true,
      data: dataFine,
      cache: false,
      beforeSend: function(){ $("#submitFine").css('opacity', '0.8'); },
      success: function(data) {
        $.snackbar({
          content: "Infracción registrada con éxito", 
          timeout: 5000
        });      
        function redirect_function() {                   
          $("body").load("home.html").hide().fadeIn(1500).delay(6000);
          window.location.href = "home.html";
        }
        setTimeout(redirect_function, my_delay);  
      },
      error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
          this.tryCount++;
          if (this.tryCount <= this.retryLimit) {
            $.ajax(this);
            return;
          }            
          return;
        }  
        $("#submitFine").css('opacity', '1');       
        if (xhr.status == 500) {
          $.snackbar({
            content: "Ocurrio un error, no desistas e intentalo nuevamente", 
            timeout: 5000
          }); 
        } else {
          $.snackbar({
            content: "Ocurrio un error, no desistas e intentalo nuevamente", 
            timeout: 5000
          }); 
        }
      }
    });

    return false; 
  });
});

$(function () {
  var queryString = new Array();
  if (queryString.length == 0) {
    if (window.location.search.split('?').length > 1) {
      var params = window.location.search.split('?')[1].split('&');
      for (var i = 0; i < params.length; i++) {
        var key = params[i].split('=')[0];
        var value = decodeURIComponent(params[i].split('=')[1]);
        queryString[key] = value;
      }
    }
  }
  if (queryString["plate"] != null && queryString["fullName"] != null) {
    $('#plateVehicle').val(queryString["plate"]);
    //$('#typeLicense').val(queryString["typeLicense"]);
    $('#fullName').val(queryString["fullName"]);
    $('#numberLicense').val(queryString["numberLicense"]);
    $('#state').val(queryString["state"]);
    $('#typePlate').val(queryString["typePlate"]);
    $('#typeVehicle').val(queryString["typeVehicle"]);
    $('#brandVehicle').val(queryString["brand"]);
    $('#modelVehicle').val(queryString["model"]);
    $('#lineVehicle').val(queryString["serie"]);
    $('#colorVehicle').val(queryString["color"]);
    $('#serviceVehicle').val(queryString["service"]);
  }
});