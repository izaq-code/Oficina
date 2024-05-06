var apagou = false;

$("#lixo").click(function (event) {
    apagou = true;
});

$(document).ready(function () {
    $('#atualizar').submit(function (e) {
        e.preventDefault();

        var formData = new FormData(this); // Criando um novo FormData com os dados do formulário

        // Adicionando a flag apagou ao FormData
        formData.append('apagou', apagou);

        // Processando a imagem em base64, se houver
        if ($('#foto__input9')[0].files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                formData.append('foto', e.target.result); // Adiciona a imagem como base64 ao FormData
                enviarFormulario(formData);
            }
            reader.readAsDataURL($('#foto__input9')[0].files[0]); // Lê o arquivo como base64
        } else {
            enviarFormulario(formData); // Se não houver imagem, envia o formulário
        }
    });
});

function enviarFormulario(formData) {
    $.ajax({
        url: '../PHP/perfil-usuario.php',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log('Resposta do servidor:', response); // Verifica a resposta do servidor
            Swal.fire({
                icon: 'success',
                title: 'Perfil atualizado com sucesso!',
                customClass: {
                    confirmButton: 'swal-button' 
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        },
        error: function(xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            console.error('Erro ao enviar o formulário:', error);
            Swal.fire({
              icon: 'error',
              title: 'Erro ao enviar o formulário',
              text: 'Por favor, tente novamente mais tarde.',
              customClass: {
                confirmButton: 'swal-button' 
            }
            });
        }
    });
}
