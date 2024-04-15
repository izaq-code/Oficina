$(document).ready(function(){
    $('#cadastro').submit(function(e){
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '../PHP/cadastro_seguradora.php',
            data: formData,
            success: function(){
              //  window.location.href = "./index.html"; 
                
            }
        });
    });
});

