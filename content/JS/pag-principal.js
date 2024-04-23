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
   
    var solicitacao = data.solicitacao;
    var exibicao = data.exibicao;

    q = $('#informacao-aberta');
    q.empty();

    q.append(solicitacao[0][0]);

    w = $('#informacao-concluida');
    w.empty();

    w.append(solicitacao[0][1]);

    //grafico

    var aberta = solicitacao[0][0];

    var concluida = solicitacao[0][1];

    var labels = ['Aberta', 'Concluída'];

    var valores = [aberta, concluida];

    var graf = document.getElementById('grafico-solicitacoes').getContext('2d');

    var grafico = new Chart(graf, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'qte',
                data: valores,
                backgroundColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 255, 0, 1)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 255, 0, 1)',
                ],
                borderWidth: 0.5,
            }]
        },
        options: {
            responsive: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Solicitações'
                }
            },
            layout: {
                padding: {
                    left: 50,
                    right: 50,
                    top: 0,
                    bottom: 0
                }
            }

        }
    });



    //cuidando do exibir
    t = $('#mostrar');
    t.empty();

    var i = 1;

    var adicionar = (
        "<div class='card-solicitacoes-container'>" +
        "<table class='solicitacoes-table'>" +
        "<thead>" +
        "<tr>" +
        "</tr>" +
        "</thead>" +
        "<tbody>"
    );

    exibicao.forEach(function(e) {
        let statusClass = '';
        if (e['status_veiculo'] === 'aberto') {
            statusClass = 'status_aberto';
        } else if (e['status_veiculo'] === 'Finalizado') {
            statusClass = 'status_finalizado';
        }

        let iconeClass = '';
        if (e['status_veiculo'] === 'aberto') {
            iconeClass = '<img class="icon" src="../img/solicitacao_fe.svg"></img>';
        } else if (e['status_veiculo'] === 'Finalizado') {
            iconeClass = '<img class="icon" src="../img/solicitacao_ab.svg"></img>';
        }
        
        adicionar += (
            "<tr class='card-solicitacoes' id='" + e['cod_veiculo'] + "'>" +
            "<td colspan='2' class='solicitacao-icone'>" + iconeClass + "</td>" +
            "<td colspan='2' class='solicitacao-titulo'>Solicitação " + i + "</td>" +
            "<td class='solicitacao-texto'>" + e['modelo'] + "</td>" +
            "<td class='" + statusClass + "'>" + e['status_veiculo'] + "</td>" +
            "<td>" + e['sinistro'] + "</td>" +
            "<td class='solicitacao-detalhes' data-cod_veiculo='"+ e['cod_veiculo'] +"'>Detalhes</td>" +
            "</tr>"
        );

        console.log(e['cod_veiculo']);

        i++;
    });

    adicionar += (
        "</tbody>" +
        "</table>" +
        "</div>"
    );

    t.append(adicionar);

    $(".solicitacao-detalhes").click(function (event) {
        event.preventDefault();

        var codVeiculo = $(this).data('cod_veiculo');

        localStorage.setItem('codVeiculo', codVeiculo);

        window.location.href = '../HTML/vermais.html';
    })
}
