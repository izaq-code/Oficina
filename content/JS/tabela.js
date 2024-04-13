document.addEventListener("DOMContentLoaded", tabela);
window.addEventListener("load", tabela);
function tabela(){
    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: '../PHP/tabela.php',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: 'json',
            success: function(data){
                exibir(data)
            }

        });
    });
}

function exibir(data){
    
    t = $('#nome');
    t.empty();
    t.append(data);
}