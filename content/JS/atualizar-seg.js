var cod_veiculo = localStorage.getItem('codVeiculo');

$(document).ready(function () {
    $('#cadastrar').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();
        
        formData += '&cod_veiculo=' + cod_veiculo;

        $.ajax({
            url: '../PHP/atualizar-seg.php',
            type: 'POST',
            data: formData,
            success: function (response) {
                console.log('Resposta do servidor:', response); // Verifica a resposta do servidor
                Swal.fire({
                    icon: 'success',
                    title: 'Atualizado com sucesso!',
                    customClass: {
                        confirmButton: 'swal-button'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            },
            error: function (xhr, status, error) {
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
    });
});
