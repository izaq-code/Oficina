$(document).ready(function () {
    $('#uploadImagens').submit(function (e) {
        e.preventDefault();
  
        var formData = new FormData();
        var imagem1Input = document.getElementById('foto__input1');
        var imagem2Input = document.getElementById('foto__input2');
        var imagem3Input = document.getElementById('foto__input3');
        var imagem4Input = document.getElementById('foto__input4');
        var imagem5Input = document.getElementById('foto__input5');
        var imagem6Input = document.getElementById('foto__input6');
        var imagem7Input = document.getElementById('foto__input7');
        var imagem8Input = document.getElementById('foto__input8');
  
        if (!imagem1Input || !imagem2Input || !imagem3Input || !imagem4Input || !imagem5Input || !imagem6Input
            || !imagem7Input || !imagem8Input) {
            console.error("Os campos de imagem não foram encontrados.");
            return;
        }
  
        if (imagem1Input.files.length === 0 || imagem2Input.files.length === 0 || imagem3Input.files.length === 0 || imagem4Input.files.length === 0 ||
            imagem5Input.files.length === 0 || imagem6Input.files.length === 0 || imagem7Input.files.length === 0 || imagem8Input.files.length === 0) {
            alert("Por favor, preencher todos os campos !!");
            return;
        }
  
        var imagem1 = imagem1Input.files[0];
        var imagem2 = imagem2Input.files[0];
        var imagem3 = imagem3Input.files[0];
        var imagem4 = imagem4Input.files[0];
        var imagem5 = imagem5Input.files[0];
        var imagem6 = imagem6Input.files[0];
        var imagem7 = imagem7Input.files[0];
        var imagem8 = imagem8Input.files[0];
  
        formData.append('foto__input1', imagem1);
        formData.append('foto__input2', imagem2);
        formData.append('foto__input3', imagem3);
        formData.append('foto__input4', imagem4);
        formData.append('foto__input5', imagem5);
        formData.append('foto__input6', imagem6);
        formData.append('foto__input7', imagem7);
        formData.append('foto__input8', imagem8);
  
        $.ajax({
            url: '../PHP/upload.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (resposta) {
                $('#mensagem').text(resposta);
            },
            error: function (xhr, status, error) {
                $('#mensagem').text('Erro ao enviar as imagens: ' + error);
            }
        });
    })
})