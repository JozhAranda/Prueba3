$(document).ready(function() {          
  $('#inputSearch').keypress(function(event) {

    if ( event.keyCode == 13) {
    
      event.preventDefault();  
      var search = $('#inputSearch').val();
      $(".well-card").css("display", "none");
      $("#well-card").load(location.href+" #well-card>*","");
      $("#textEmpty").text("");

      if(!$(this).val()) {
        $("#textEmpty").text("Es necesario capturar por matrícula o número de licencia..."); 
        return false;
      }
      
      $.ajax({
        type:'GET',
        //url: "service.php?search=" + search,
        url: "http://joshuaranda.website/sspm/infraccion/service.php?search=" + search,
        async: true,
        crossDomain: true,
        dataType: "xml",            
        cache: false,
        beforeSend: function(){ $(".loader").fadeOut("200").css("display", "block"); },
        success: function(data) {
          $(".loader").css("display", "none");
          if(data) { $(".well-card").css("display", "block"); }
          else { $("#textEmpty").text("No se encontró historial"); }
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
            console.log(xhr.responseText);
          } else {
            console.log(xhr.responseText);
          }
        }  
      }).then(function(data) {

        var xml = data;
        
        $.each($(xml).find('Infraccion'), function(key, value) {
          $('.fine').append(value).append("<br/>");
        });
        
        $.each($(xml).find('Fecha'), function(key, value) {
          $('.dateFineTemp').append(value);
          var abc = $('.dateFineTemp').text();
          var date = abc.toString().substring(0, 10);
          var time = abc.toString().substring(11, 16);
          var res = date + ", " + time;
          $('.dateFine').append(res).append("<br/>");
        });
        
        $.each($(xml).find('Placa'), function(key, value) {
          if(key < 1) {
            $('.plate').append(value).append("<br/>");
          }
        });
        
        $.each($(xml).find('Tipo'), function(key, value) {
          $('.typeLicense').append(value).append("<br/>");
        });
        
        $.each($(xml).find('Articulo'), function(key, value) {
          $('.article').append("<br/>").append(value);
        });
        $.each($(xml).find('Fraccion'), function(key, value) {
          $('.part').append(value);
        });

        $.each($(xml).find('NombresConductor'), function(key, value) {
          if(key < 1) {
            $('.name').append(value);
            $('#name').append(value);
          }
        });
        $.each($(xml).find('MaternoConductor'), function(key, value) {
          if(key < 1) {
            $('.lastName').append(value);
            $('#lastName').append(value);
          }
        });
        $.each($(xml).find('NombresConductor1'), function(key, value) {
          if(key < 1) {
            $('.firstName').append(value);
            $('#firstName').append(value);
          }
        });

        $.each($(xml).find('Licencia'), function(key, value) {
          if(key < 1) {
            $('.numberLicense').append(value).append("<br/>");
          }
        });  

        $.each($(xml).find('Estado'), function(key, value) {
          if(key < 1) {
            $('.state').append(value).append("<br/>");
          }
        }); 

        $.each($(xml).find('TipoPlaca'), function(key, value) {
          if(key < 1) {
            $('.typePlate').append(value).append("<br/>");
          }
        }); 

        $.each($(xml).find('TipoVehiculo'), function(key, value) {
          if(key < 1) {
            $('.typeVehicle').append(value).append("<br/>");
          }
        }); 

        $.each($(xml).find('Marca'), function(key, value) {
          if(key < 1) {
            $('.brand').append(value).append("<br/>");
          }
        }); 

        $.each($(xml).find('Modelo'), function(key, value) {
          if(key < 1) {
            $('.model').append(value).append("<br/>");
          }
        });  

        $.each($(xml).find('Serie'), function(key, value) {
          if(key < 1) {
            $('.serie').append(value).append("<br/>");
          }
        }); 

        $.each($(xml).find('Color'), function(key, value) {
          if(key < 1) {
            $('.color').append(value).append("<br/>");
          }
        }); 

        $.each($(xml).find('Servicio'), function(key, value) {
          if(key < 1) {
            $('.service').append(value).append("<br/>");
          }
        });           
      });
    }
  });
});