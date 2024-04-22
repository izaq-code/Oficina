$(document).ready(function(){
    $('#cadastrar').submit(function(e){
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '../PHP/login_seguradora.php',
            data: formData,
            dataType: 'json',
            success: function(response){
                entrar(response)
                $('#cnpj').val('');
                $('#senha').val('');
            }  
        });
    });
});

function entrar(response){
    let acesso = response;
    acesso === true ? window.location.href = "../../index.html" : a();
} 

function a(){
    t = $('#resposta_seguradora');
    t.empty();
    resp = (
        '<p> CNPJ ou senha não encontrados, tente novamente !</p>'
    )
    t.append(resp);
}

       