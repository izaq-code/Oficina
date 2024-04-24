$(document).ready(function () {
    $('#entre_adm').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '../PHP/login_adm.php',
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


    acesso === true ? window.location.href = "../HTML/pag-principal-oficina.html" : g();

}

function g(){
    t = $('#resposta_login');
    t.empty();
    resp = (
        '<p>ra ou senha não encontrados, tente novamente !</p>'
    )
    t.append(resp);
}
