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


    function addNumbersToDoughnutChart(chart) {
        var ctx = chart.ctx;
        var labels = chart.data.labels;
    
        chart.data.datasets.forEach(function(dataset, datasetIndex) {
            var meta = chart.getDatasetMeta(datasetIndex);
            if (!meta.hidden) {
                meta.data.forEach(function(element, index) {
                    var centerX = element._model.x;
                    var centerY = element._model.y;
    
                    var data = dataset.data[index];
                    var fontSize = 14;
                    var fontStyle = 'normal';
                    var fontFamily = 'Helvetica Neue';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    ctx.fillStyle = 'white';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
    
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(data, centerX + position.x + padding, centerY + position.y + padding);
                });
            }
        });
    }

    var aberta = parseInt(solicitacao[0][0]);
    var concluida = parseInt(solicitacao[0][1]);

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
                borderWidth: 1,
                cutout: '80%',
                circumference: 180,
                rotation: 270,
            }]
        },
        options: {
            responsive: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'white'
                    }
                },
                title: {
                    display: false,
                    text: 'Solicitações'
                },
            },
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20
                }
            },
            animation: {
                onProgress: function(animation) {
                    var graf = animation.chart.ctx;
                    var dataset = animation.chart.data.datasets[0];
                    var valores = dataset.data;
                    var dataAtual = aberta + concluida
                    
                    var centerX = graf.canvas.width / 2;
                    var centerY = graf.canvas.height / 1.55;
                    var text = 'Solicitações totais';
                    var fontSize = 14; 
                    var fontStyle = 'normal';
                    var fontFamily = 'Poppins';
                    graf.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    graf.fillStyle = 'white';
                    graf.textAlign = 'center';
                    graf.textBaseline = 'middle';
                    graf.fillText(text, centerX, centerY);
                    
                    // Texto 2 - Quantidade de solicitações atuais
                    var centerX2 = graf.canvas.width / 2;
                    var centerY2 = graf.canvas.height / 1.95;
                    var text2 = dataAtual;
                    var fontSize2 = 45; 
                    var fontStyle2 = 'bolder'; 
                    var fontFamily2 = 'Poppins'; 
                    graf.font = Chart.helpers.fontString(fontSize2, fontStyle2, fontFamily2); 
                    graf.fillStyle = 'white'; 
                    graf.fillText(text2, centerX2, centerY2);
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
        "<div class='titulo-solicitacoes'>Solicitações</div>" +
        "<hr>" +
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
            "<td class='solicitacao-detalhes' data-cod_veiculo='" + e['cod_veiculo'] +"'>Detalhes</td>" +

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
