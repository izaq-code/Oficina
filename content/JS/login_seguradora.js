$(document).ready(function(){
    $('#cadastrar').submit(function(e){
        e.preventDefault();

        var cnpj = $('[id="cnpj"]').val();
        var senha = $('[id="senha"]').val();
       
        var senhaHash = CryptoJS.SHA256(senha).toString(CryptoJS.enc.Hex);
        
        var cnpjHash = CryptoJS.SHA256(cnpj).toString(CryptoJS.enc.Hex);
        
        var formData = {
            cnpj: cnpjHash,
            senha: senhaHash,
        };

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
        'CNPJ e/ou senha incorretos. Tente novamente!</p>'
    )
    t.append(resp);
}
