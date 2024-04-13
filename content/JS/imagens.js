$(document).ready(function () {
    $('#uploadImagens').submit(function (e) {
        e.preventDefault();

        var formData = new FormData();
        var numFiles = 8;

        for (var i = 1; i <= numFiles; i++) {
            var inputName = 'foto__input' + i;
            var inputFile = document.getElementById(inputName);

            if (!inputFile || inputFile.files.length === 0) {
                console.error("O campo de imagem " + i + " não foi encontrado ou está vazio.");
                continue;
            }

            formData.append(inputName, inputFile.files[0]);
        }

        $.ajax({
            url: '../PHP/upload.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (resposta) {
                $('#mensagem').text(resposta);

                $('#imagem-container').empty();

                for (var i = 1; i <= numFiles; i++) {
                    var imagePath = '../upload/' + inputFile.files[0].name;
                    var imageElement = $('<img>').attr('src', imagePath).addClass('uploaded-image');
                }
            },
            error: function (xhr, status, error) {
                $('#mensagem').text('Erro ao enviar as imagens: ' + error);
            }
        });
    });
});
