
$(document).ready(function() {   
  $.ajax({            
    //url: "http://joshuaranda.website/sspm/inteligencia/images.php", 
    url: "img.php",
    type: "POST",          
    dataType: "HTML",
    async: true,
    crossDomain: true,
    beforeSend: function(){ $(".loader").fadeOut("200").css("display", "block"); },
    success: function( data ) { 
      $(".loader").css("display", "none");
      $('#gallery').append(data);
      $('.main-gallery').flickity({
        freeScroll: true,
        prevNextButtons: false,
        contain: true,
        pageDots: false
      });
    },
    error : function(xhr, textStatus, errorThrown ) {
      if (textStatus === 'timeout') {
        this.tryCount++;
        if (this.tryCount <= this.retryLimit) {
          $.ajax(this);
          return;
        }            
        return;
      }       
      if (xhr.status === 500) {
        $.snackbar({
          content: "Ocurrio un error, al intentar conectarse al servidor", 
          timeout: 5000
        }); 
      } else {
        $.snackbar({
          content: "Ocurrio un error, al descargar las imagenes", 
          timeout: 5000
        }); 
      }
    }
  }); 
});      

$('#syncData').on('click touch', function(event) {
  event.preventDefault();
});