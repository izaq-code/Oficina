$(document).ready(function () {
    $('#entre_adm').submit(function (e) {
        e.preventDefault();

        var ra = $('#ra').prop('value');
        var senha = $('#senha').prop('value');

        var senhaHash = CryptoJS.SHA256(senha).toString(CryptoJS.enc.Hex);

        var data = {
            ra: ra,
            senha: senhaHash,
        };

        $.ajax({
            type: 'POST',
            url: '../PHP/login_adm.php',
            data: data,
            dataType: 'json',
            success: function (sucesso) {
                entrar(sucesso);
                $('#email').val('');
                $('#senha').val('');
            }
        });
    });
});

function entrar(sucesso) {

    let acesso = sucesso[0];

    let cod = sucesso[1];
    
    localStorage.setItem('codCareca', cod);


    acesso === true ? window.location.href = "../HTML/pag-principal-oficina.html" : g();

}

function g(){
    t = $('#resposta_login');
    t.empty();
    resp = (
        'Ra e/ou senha incorretos. Tente novamente!'
    )
    t.append(resp);
}
