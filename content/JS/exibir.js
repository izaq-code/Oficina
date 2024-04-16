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
   
}