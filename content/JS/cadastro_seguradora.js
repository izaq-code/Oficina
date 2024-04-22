$(document).ready(function(){
    $('#cadastrar_seguradora').submit(function(e){
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '../PHP/cadastro_seguradora.php',
            data: formData,
            success: function(response){
                cadastro(response)
               console.log('Resposta do servidor', response);
               alert('Cadastrado com sucesso!!')
            },
            error: function(xhr, status, error){
                var erro = xhr.status = ': ' + xhr.statusText;
                console.error('Erro ao cadastrar:', erro);
                alert('Erro ao cadastrar ' + erro);
            }
        });
    });
});

       