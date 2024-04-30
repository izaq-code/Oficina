$(document).ready(function(){
    $('#cadastrar').submit(function(e){
        e.preventDefault();

        var email= $('[id="email"]').val();
        var senha = $('[id="senha"]').val();
       
        var senhaHash = CryptoJS.SHA256(senha).toString(CryptoJS.enc.Hex);
        
        var formData = {
            email: email,
            senha: senhaHash,
        };

        $.ajax({
            type: 'POST',
            url: '../PHP/login_seguradora.php',
            data: formData,
            dataType: 'json',
            success: function(response){
                entrar(response);
                $('#email').val('');
                $('#senha').val('');
            }  
        });
    });
});


function entrar(response){
    let acesso = response;
    if (acesso === true) {
        window.location.href = "../HTML/pag-principal.html"; 
    } else {
        s();
    }
} 

function entrar(response) {
    let acesso = response[0];
    if (acesso === true) {
        let cod = response[1];
        localStorage.setItem('codCareca', cod);
        window.location.href = "../HTML/pag-principal-oficina.html";
    } else {
        a();
    }
}

function s(){
    t = $('#resposta_seguradora');
    t.empty();
    resp = (
        'Email ou senha estão incorretos. Tente novamente!</p>'
    )
    t.append(resp);
}

function a(){
    t = $('#resposta_seguradora');
    t.empty();
    resp = (
        'RA ou senha estão incorretos. Tente novamente!</p>'
    )
    t.append(resp);
}





