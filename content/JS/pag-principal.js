document.addEventListener("DOMContentLoaded", exibirDados);
//window.addEventListener("load", exibir);
function exibirDados() {
    $(document).ready(function () {
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
                label: 'Quantidade',
                data: valores,
                backgroundColor: [
                    'rgb(209, 209, 209)',
                    'rgb(126, 172, 104)',
                ],
                borderColor: [
                    'rgb(209, 209, 209)',
                    'rgb(126, 172, 104)',
                ],
                borderWidth:1,cutout:'80%',
                circumference:180,
               rotation:270,
            }]
        },
        options: {
            responsive: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: false,
                    text: 'Solicitações'
                }
            },
            layout: {
                padding: {
                    left: 20,
                    right: 20,
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
            iconeClass = '<img class="icon" src="../img/aberto.png"></img>';
        } else if (e['status_veiculo'] === 'Finalizado') {
            iconeClass = '<img class="icon" src="../img/Finalizado.png"></img>';
        }
        
        adicionar += (
  

            "<tr class='card-solicitacoes' id='" + e['cod_veiculo'] + "'>" +
            "<td>" + "<div class='solicitacao-icone'>" + iconeClass + "</div></td>" +
            "<td class='solicitacao-texto'>" + 
                "<div class='solicitacao-id'>" + e['id_personalizado'] + "</div>" + 
                "<div class='solicitacao-numero'>Solicitação " + i + "</div>" +
            "</td>" +
            "<td class='solicitacao-texto'>" + e['modelo'] + "</td>" +
            "<td>" + "<div class='" + statusClass + "'>" + e['status_veiculo'] + "</div></td>" + 
            "<td>" + e['sinistro'] + "</td>" + 
            "<td class='solicitacao-detalhes'>Detalhes</td>" +
            "</tr>"
   
        );

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
