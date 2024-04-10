$(document).ready(function () {
    $('#entre').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: './PHP/login.php',
            data: formData,
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


    acesso === true ? window.location.href = "./conteudos/inicial.html" : g();

}

function g(){
    t = $('#resposta_login');
    t.empty();
    resp = (
        '<p>usuario ou senha não encontrados, tente novamente !</p>'
    )
    t.append(resp);
}
