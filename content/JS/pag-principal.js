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
            "<div class='card-solicitacoes-container'>"
            +   "<div class='card-solicitacoes'>"
            +       "<h2> Solicitação " + i + "</h2><br><br>"
            +       "<div class='solicitacoes-texto'><b>Modelo: </b>" + e['modelo'] + "</div>"
            +       "<div class='solicitacoes-texto'><b>Sinistro: </b>" + e['sinistro'] + "<br><br><br></div>"
            +       "<div class='solicitacoes-texto'><b>Status: </b>" + e['status_veiculo'] + "<br><br><br></div>"
            +       "<div class='solicitacoes-ver-mais'>Ver mais ➜</div>"
            +   "</div>"
            + "</div>"
        )

        i++;

        t.append(adicionar);
    });

    let maxHeight = 0;
    $('.card-solicitacoes').each(function() {
    let height = $(this).height();
    if (height > maxHeight) {
        maxHeight = height;
    }
});

// Definir a mesma altura para todos os cards
$('.card-solicitacoes').height(maxHeight);
}

