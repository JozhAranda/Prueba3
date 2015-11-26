var fileToInsert = document.getElementById("contentImage");

document.querySelector('#takePicture').onchange = function(e) {
  validateFiles(this.files);
  var images = $('.contentImage').children('div').children('img').map(function(){
    var maxFile = $(this).attr('src');
    if(maxFile > 4) {
      $.snackbar({
        content: "Solamente puedes seleccionar máximo 4 imagenes.", 
        timeout: 5000
      });             
    }
  }).get();
};

function validateFiles (files) {
  if (typeof files !== "undefined" && files.length >= 1 && event.target.files.length <= 4) {
    for (var i=0, l=files.length; i<l; i++) {
      uploadFile(files[i]);
    }
  } else if(files.length > 4) {
    $.snackbar({
      content: "Solamente puedes seleccionar máximo 4 imagenes.", 
      timeout: 5000
    }); 
  } else {
    $.snackbar({
      content: "Ocurrió un error, por favor vuelve a intentarlo.", 
      timeout: 5000
    });           
  }
}

function uploadFile (file) {
  var div = document.createElement("div"),
      img,
      reader;

  if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
    img = document.createElement("img");
    div.appendChild(img);
    reader = new FileReader();  
    console.log("reader",reader);
    reader.onload = (function (theImg) {
      return function (evt) {
        var src = evt.target.result;
        theImg.src = src;
        theImg.className = "pictureImage";
      };
    }(img));
    reader.readAsDataURL(file);
  }

  fileToInsert.appendChild(div);
}