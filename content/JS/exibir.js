document.addEventListener("DOMContentLoaded", exibirDados);
//window.addEventListener("load", exibir);
function exibirDados() {
    $(document).ready(function () {
        console.log("DOMContentLoaded event fired!");
        $.ajax({
            type: 'POST',
            url: '../PHP/exibir.php',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: 'json',
            success: function (data) {
                exibir(data);
            }
        });
    });
}

function exibir(data) {

    console.log(data);
    var solicitacao = data.solicitacao;
    var exibicao = data.exibicao;

    q = $('#informacao-aberta');
    q.empty();

    console.log(solicitacao[0][0])

    q.append(solicitacao[0][0]);

    w = $('#informacao-concluida');
    w.empty();

    w.append(solicitacao[0][1]);

    t = $('#mostrar');
    t.empty();

    var i = 1;

    exibicao.forEach(function (e) {

        let adicionar = (
            "<div class='status'>"
            + "<h1> Solicitação " + i + "</h1><br>"
            + "<h6 class='negro'> Modelo: </h6> <p>" + e['modelo'] + "</p><br>"
            + "<h6 class='negro'> Sinistro: </6> <p>" + e['sinistro'] + "</p> <br><br>"
            + "<h6 class='negro'> Status: </h6> <p>" + e['status_veiculo'] + "</p>"
            + "</div>"
        )

        i++;

        t.append(adicionar);
    });

}

