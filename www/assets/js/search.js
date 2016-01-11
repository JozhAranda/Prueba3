/*
$(document).ready(function() {          
  $('#inputSearch').keypress(function(event) {

    if (event.keyCode === 13) {
    
      event.preventDefault();  
      var search = $('#inputSearch').val();
      
      $("#gallery").load(location.href+" #gallery>*","");

      if(!$(this).val()) {

        location.reload();
        return false;
      }

      document.activeElement.blur();

      $.ajax({             
        type: "GET", 
        url: "http://joshuaranda.website/sspm/inteligencia/images.php?search=" + search,          
        //url: "img.php?search=" + search,
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

$('#inputSearch').keypress(function(event) {

  if(event.keyCode == 13) {
  
    event.preventDefault();  
    var search = $('#inputSearch').val();
    
    $("#gallery").load(location.href+" #gallery>*","");
    $(".loader").fadeOut("200").css("display", "block");

    if(!$(this).val()) {

      location.reload();
      return false;
    }

    document.activeElement.blur();

    if(search) {

      search = search.replace('"', '');
      search = search.toUpperCase();

      $.get("file:///sdcard/wanted", function(data) {
        $(".loader").css("display", "none");          
        var html = '<div class="main-gallery gallery js-flickity">';
                
        $(data).each(function(key, element) {
          if(key >= 4) {
            if(element.text != undefined) {

              $('#testInput').val(element.text);            
              var abc = $('#testInput').val();

              var first = abc.split('"');
              var image = first[1];
              var dir = "file:///sdcard/wanted/" + image;

              var imgArray = new Array();
              var imgTemp = image.substring(0, image.lastIndexOf("."));
              
              imgArray = record(imgTemp);
              
              if(search == image.toUpperCase() || imgArray.indexOf(search) != -1) {
             
                html += '<div class="gallery-cell" style="border: 1px solid #ccc;">';
                html += '<a class="fancybox" rel="group" href="'+ dir +'">';
                html += '<img src="'+ dir +'" class="img" title="'+ image +'" width="512" />';
                html += '</a>';
                html += '</div>'; 
              }
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
    }
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
