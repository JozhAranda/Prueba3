/*
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
*/

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
        url: "wanted",
        beforeSend: function(){ $(".loader").fadeOut("200").css("display", "block"); },
        success: function(data) {          
          $(".loader").css("display", "none");
          
          var html = '<div class="main-gallery gallery js-flickity">';

          if(search) {

            search = search.replace('"', '');
            search = search.toUpperCase();
      
            $(data).find("a:contains()").each(function(index, value) {
            
              if(index >= 5) {
              
                var image = $(this).attr("href");

                var imgArray = new Array();
                var imgTemp = image.substring(0, image.lastIndexOf("."));
                
                imgArray = record(imgTemp);
                
                if(search == image.toUpperCase() || imgArray.indexOf(search) != -1) {

                  var dir = "wanted/" + image;
                  html += '<div class="gallery-cell" style="border: 1px solid #ccc;">';
                  html += '<a class="fancybox" rel="group" href="'+ dir +'">';
                  html += '<img src="'+ dir +'" class="img" title="'+ image +'" width="512" />';
                  html += '</a>';
                  html += '</div>'; 
                }
              }                    
            });
          
          }
            
          html += '</div>';
            
          $('#gallery').append(html);
          
          $('.main-gallery').flickity({
            freeScroll: true,
            prevNextButtons: false,
            contain: true,
            pageDots: false
          });
        },
        error : function(xhr, textStatus, errorThrown) {
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

  function record(value) {

    value   = value.toUpperCase();
    var aux = value.split("-");

    var record = new Array();

    for(var i = 0; i <= aux.length; i++) {

      record.push(aux[i]);
    }

    aux = null;

    return record;
  }

});