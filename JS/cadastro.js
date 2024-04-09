$(document).ready(function () {
    $('#cadastrar').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: './PHP/cadastro.php',
            data: formData,
            success: function(response){
                console.log('Resposta do servidor:', response); // Verifica a resposta do servidor
                alert('Cadastrado com sucesso');
            },
            error: function(xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText;
                console.error('Erro ao cadastrar:', errorMessage); // Exibe o erro no console
                alert('Erro ao cadastrar: ' + errorMessage);
            }
        })
    })
})