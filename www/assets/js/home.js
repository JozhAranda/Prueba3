/*
$(document).ready(function() {   
  $.ajax({            
    url: "http://joshuaranda.website/sspm/inteligencia/images.php", 
    //url: "img.php",
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
*/

$.get("file:///sdcard/wanted", function(data) {    
  var html = '<div class="main-gallery gallery js-flickity">';
  $(data).each(function(key, element) {
    if(key >= 4) {
      if(element.text != undefined) {

        $('#testInput').val(element.text);            
        var abc = $('#testInput').val();

        var first = abc.split('"');
        var image = first[1];
        var dir = "file:///sdcard/wanted/" + image;
        
        html += '<div class="gallery-cell" style="border: 1px solid #ccc;">';
        html += '<a class="fancybox" rel="group" href="'+ dir +'">';
        html += '<img src="'+ dir +'" class="img" title="'+ image +'" width="512" />';
        html += '</a>';
        html += '</div>'; 
      }
    }            
  });
  
  html += '</div>'; 
  
  $('#gallery').append(html);
  $('.main-gallery').flickity({
    freeScroll: true,
    prevNextButtons: false,
    contain: true,
    pageDots: false
  });      
});