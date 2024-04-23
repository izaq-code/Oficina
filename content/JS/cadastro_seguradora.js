$(document).ready(function(){
    $('#cadastrar_seguradora').submit(function(e){
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '../PHP/cadastro_seguradora.php',
            data: formData,
            success: function(response){
               console.log('Resposta do servidor', response);
               alert('Cadastro concluído com sucesso !');
               window.location.href = "entre-cliente.html";
            },
            error: function(xhr, status, error){
                var erro = xhr.status = ': ' + xhr.statusText;
                console.error('Erro ao cadastrar:', erro);
                alert('Erro ao cadastrar ' + erro);
            }
        });
    });
});

function a(response){
     t = $('#alerta');
     t.empty();
     resp = (
        '<p>' + response + '</p>'
     )
     t.append(resp);
}