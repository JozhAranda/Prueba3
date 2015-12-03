$(function() {
  $('#submitFine').on('click touch', function(event) {
  
    event.preventDefault();       
    
    var dataFine = $('#formFine').serialize();

    $.ajax({
      method: 'POST',
      //url: 'http://soporte.policiatijuana.gob.mx:88/Api/Multa/',
      async: true,
      crossDomain: true,
      data: dataFine,
      cache: false,
      beforeSend: function(){ $("#submitFine").css('opacity', '0.8'); },
      success: function(data) {           
        /*$("body").load("preview.html").hide().fadeIn(1500).delay(6000);
        window.location.href = "preview.html";*/
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