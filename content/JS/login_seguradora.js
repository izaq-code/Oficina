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
                if (response === 'a') {
                    entrarCliente(response);
                } else {
                    entrarOficina(response);
                }
                $('#email').val('');
                $('#senha').val('');
            }  
        });
    });
});

function  entrarOficina(response) {
    let acesso = response[0];
    if (acesso === true) {
        let cod = response[1];
        localStorage.setItem('codCareca', cod);
        window.location.href = "../HTML/pag-principal-oficina.html";
    } else {
        a();
    }
}

function entrarCliente(response) {
    let acesso = response;
    if (acesso === 'a') {
        window.location.href = "../HTML/pag-principal.html"; 
    } else {
        a();
    }
}



function a(){
    t = $('#resposta_seguradora');
    t.empty();
    resp = (
        'Email ou RA e senha estão incorretos. Tente novamente!</p>'
    )
    t.append(resp);
}





