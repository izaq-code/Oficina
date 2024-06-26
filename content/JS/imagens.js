var cod = localStorage.getItem('Codredirecionar');

$(document).ready(function () {
    $('#uploadImagens').submit(function (e) {
        e.preventDefault();

        var formData = new FormData();
        var numFiles = 8;

        // Adiciona as imagens ao FormData
        for (var i = 1; i <= numFiles; i++) {
            var inputName = 'foto__input' + i;
            var inputFile = document.getElementById(inputName);

            if (!inputFile || inputFile.files.length === 0) {
                console.error("O campo de imagem " + i + " não foi encontrado ou está vazio.");
                continue;
            }

            formData.append(inputName, inputFile.files[0]);
        }

        // Adiciona o arquivo PDF ao FormData
        var pdfFile = document.getElementById('pdfFile');
        if (pdfFile.files.length > 0) {
            formData.append('pdfFile', pdfFile.files[0]);
        }

        formData.append('cod', cod);

        $.ajax({
            url: '../PHP/upload.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function () {

            },  
            error: function (xhr, status, error) {
                $('#mensagem').text('Erro ao enviar as imagens: ' + error);
            }
        });
    });
});
