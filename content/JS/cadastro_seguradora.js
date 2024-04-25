function hashCNPJ(cnpj) {
    var hash = CryptoJS.SHA256(cnpj).toString(CryptoJS.enc.Hex);
    return hash;
}

function hashSenha(senha) {
    var hash = CryptoJS.SHA256(senha).toString(CryptoJS.enc.Hex);
    return hash;
}

$(document).ready(function(){
    $('#cadastrar_seguradora').submit(function(e){
        e.preventDefault();

        var nome = $('[id="nome"]').val();
        var cnpj = $('[id="cnpj"]').val();
        var senha = $('[id="senha"]').val();

        var cnpj_hash = hashCNPJ(cnpj);
        var senha_hash = hashSenha(senha);
        
        var formData = new FormData();
        formData.append('nome', nome);
        formData.append('cnpj', cnpj_hash); 
        formData.append('senha', senha_hash);
 
        $.ajax({
            type: 'POST',
            url: '../PHP/cadastro_seguradora.php',
            data: formData,
            processData: false,  
            contentType: false,  
            success: function(response){
               console.log('Resposta do servidor', response);
               alert('Cadastro concluído com sucesso !');
               window.location.href = "entre-cliente.html";
            }, 
            error: function(xhr, status, error){
                var erro = xhr.status + ': ' + xhr.statusText;
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
