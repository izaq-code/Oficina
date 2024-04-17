document.addEventListener("DOMContentLoaded", exibir);
window.addEventListener("load", exibir);
function exibir(){
    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: '../PHP/exibir.php',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: 'json',
            success: function(data){
                exibir(data);
            }
        });
    });
}

function exibir(data){
    
   console.log(data);
   
   t = $(#mostrar);
   t.empty;
   
   var i = 1;
   
   data.forEach(){
      
      let adicionar = (
      "<div class='status'>" +
      "<h1> Solicitação " + i +
      "</h1>" +
      "</div>"
      )
      
      i++;
      
      t.append(adicionar);
   }
   
}