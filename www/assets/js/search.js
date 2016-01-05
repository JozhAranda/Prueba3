
$(document).ready(function() {          
  $('#inputSearch').keypress(function(event) {

    if (event.keyCode == 13) {
    
      event.preventDefault();  
      var search = $('#inputSearch').val();
      
      $("#gallery").load(location.href+" #gallery>*","");

      if(!$(this).val()) {

        location.reload();
        return false;
      }

      $.ajax({             
        type: "GET", 
        //url: "http://joshuaranda.website/sspm/inteligencia/images.php?search=" + search,          
        url: "img.php?search=" + search,
        dataType: "HTML",
        async: true,
        crossDomain: true,
        cache: false,
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
    }
  });
});