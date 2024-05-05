document.addEventListener("DOMContentLoaded", exibirDados);
//window.addEventListener("load", exibir);
function exibirDados() {
  $(document).ready(function () {
    $.ajax({
      type: "POST",
      url: "../PHP/exibir_oficina.php",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      dataType: "json",
      success: function (data) {
        exibir(data);
      },
    });
  });
}

function exibir(data) {
  var solicitacao = data.solicitacao;
  var exibicao = data.exibicao;

  q = $("#informacao-aberta");
  q.empty();

  q.append(solicitacao[0][0]);

  w = $("#informacao-em-analise");
  w.empty();

  w.append(solicitacao[0][1]);

  e = $("#informacao-recusada");
  e.empty();

  e.append(solicitacao[0][2]);

  i = $("#informacao-concluida");
  i.empty();

  i.append(solicitacao[0][3]);

  //grafico 1

  var aberta = parseInt(solicitacao[0][0]);
  var emAnalise = parseInt(solicitacao[0][1]);
  var concluida = parseInt(solicitacao[0][2]);
  var recusada = parseInt(solicitacao[0][3]);

  var labels = ["Aberta", "Em análise", "Concluida", "Recusada"];

  var valores = [aberta, emAnalise, concluida, recusada];

  var graf = document.getElementById("grafico-solicitacoes").getContext("2d");
  var grafico = new Chart(graf, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Quantidade",
          data: valores,
          backgroundColor: [
            "rgb(209, 209, 209)",
            "rgb(66, 116, 166)",
            "rgb(126, 172, 104)",
            "rgb(153, 44, 51)",
          ],
          borderColor: [
            "rgb(209, 209, 209)",
            "rgb(66, 116, 166)",
            "rgb(126, 172, 104)",
            "rgb(153, 44, 51)",
          ],
          borderWidth: 1,
          cutout: "80%",
          circumference: 180,
          rotation: 270,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "white",
          },
        },
        title: {
          display: false,
          text: "Solicitações",
        },
      },
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
        },
      },
      animation: {
        onProgress: function (animation) {
          var graf = animation.chart.ctx;
          var dataset = animation.chart.data.datasets[0];
          var valores = dataset.data;
          var dataAtual = aberta + emAnalise + concluida + recusada;

          var centerX = graf.canvas.width / 2;
          var centerY = graf.canvas.height / 1.65;
          var text = "Solicitações totais";
          var fontSize = 14;
          var fontStyle = "normal";
          var fontFamily = "Poppins";
          graf.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
          graf.fillStyle = "white";
          graf.textAlign = "center";
          graf.textBaseline = "middle";
          graf.fillText(text, centerX, centerY);

          // Texto 2 - Quantidade de solicitações atuais
          var centerX2 = graf.canvas.width / 2;
          var centerY2 = graf.canvas.height / 2.1;
          var text2 = dataAtual;
          var fontSize2 = 45;
          var fontStyle2 = "bolder";
          var fontFamily2 = "Poppins";
          graf.font = Chart.helpers.fontString(
            fontSize2,
            fontStyle2,
            fontFamily2
          );
          graf.fillStyle = "white";
          graf.fillText(text2, centerX2, centerY2);
        },
      },
    },
  });

  //grafico 2 (seguradoras)

  var labels = data.segura_nomes;
  var valores = data.segura_numeros;

  var graf1 = document.getElementById("grafico-seguradora").getContext("2d");
  var grafico_seguradora = new Chart(graf1, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Quantidade",
          data: valores,
          backgroundColor: ["rgb(209, 209, 209)", "rgb(126, 172, 104)"],
          borderColor: ["rgb(209, 209, 209)", "rgb(126, 172, 104)"],
          borderWidth: 1,
          cutout: "80%",
          circumference: 180,
          rotation: 270,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "white",
          },
        },
        title: {
          display: false,
          text: "Solicitações",
        },
      },
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
        },
      },
    },
  });
// Função para preencher a tabela com base no valor selecionado no select
function preencherTabela(selecionado) {
    $.ajax({
        type: 'POST',
        url: '../PHP/filtrar.php',
        data: {
            selecionado: selecionado
        },
        dataType: 'json',
        success: function(data) {
            var tbody = $('#mostrar').find('tbody'); // Selecionar o corpo da tabela
            tbody.empty(); // Limpar conteúdo anterior se houver

            var i = 1;

            data.forEach(function(e) {
                let statusClass = '';
                if (e['status_veiculo'] === 'Aberto') {
                    statusClass = 'status_aberto';
                } else if (e['status_veiculo'] === 'Finalizado') {
                    statusClass = 'status_finalizado';
                } else if (e['status_veiculo'] === 'Aceito') {
                    statusClass = 'status_aceito';
                } else if (e['status_veiculo'] === 'Recusado') {
                    statusClass = 'status_recusado';
                }

                var redirecionar = (e['status_veiculo'] === 'Aberto') ?
                "<button data-cod_veiculo='" + e['cod_veiculo'] + "' class='redirecionar-button'><i class='bi bi-clipboard2'></i></button>" :
                // (e['status_veiculo'] === 'Recusado') ?
                // "<button class='redirecionar-recusado-button'><i class='bi bi-exclamation-triangle'></i></button>" :
                "";
          
            var row = (
                "<tr class='card-solicitacoes' id='" + e['cod_veiculo'] + "'>" +
                "<td><div class='solicitacao-icone'>" + getIcon(e['status_veiculo']) + "</div></td>" +
                "<td class='solicitacao-texto'>" +
                "<div class='solicitacao-id'>" + e['id_personalizado'] + "</div>" +
                "<div class='solicitacao-numero'>Solicitação " + i + "</div>" +
                "</td>" +
                "<td class='solicitacao-texto'>" + e['modelo'] + "</td>" +
                "<td><div class='" + statusClass + "'>" + mapStatus(e['status_veiculo']) + "</div></td>" +
                "<td>" + e['sinistro'] + "</td>" +
                "<td class='solicitacao-detalhes' data-cod_veiculo='" + e['cod_veiculo'] + "'>Detalhes</td>" +
                "<td>" + redirecionar + "</td>" +
                "</tr>"
            );
            
                tbody.append(row); // Adicionar a linha à tabela
                i++;
            });
           
            $('.redirecionar-button').click(function(event){
              event.preventDefault();
              var Codredirecionar = $(this).data("cod_veiculo");
              localStorage.setItem("Codredirecionar", Codredirecionar);
              window.location.href = '../HTML/Formulario-of-red.html';
            });

            // $('.redirecionar-recusado-button').click(function() {
            //    window.location.href = '../HTML/Formulario-of-Atualizar.html';
            // });

            // Adicionar evento de clique para detalhes de solicitação
            $(".solicitacao-detalhes").click(function(event) {
                event.preventDefault();
                var codVeiculo = $(this).data("cod_veiculo");
                localStorage.setItem("codVeiculo", codVeiculo);
                window.location.href = "../HTML/vermais-oficina.html";
            });
        }
    });
}

// Event listener para capturar mudanças no select #informacoes
$(document).ready(function() {
    // Renderização inicial da estrutura estática
    var adicionar = (
        "<div class='card-solicitacoes-container'>" +
        "<div class='titulo-solicitacoes'>Solicitações</div>" +
        "<div class='custom-select'>" +
        "<select id='informacoes'>" +
        "<option value='Padrao'>Todos os Status</option>" +
        "<option value='Aberto'>Aberto</option>" +
        "<option value='Finalizado'>Em análise</option>" +
        "<option value='Recusado'>Recusado</option>" +
        "<option value='Aceito'>Concluídas</option>" +
        "</select>" +
        "<i class='bi bi-caret-down-fill'></i>"+
        "</div>"+
        "<hr>" +
        "<table class='solicitacoes-table'>" +
        "<thead>" +
        "<tr>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "</tbody>" + // Aqui deixamos o corpo da tabela vazio para ser preenchido posteriormente
        "</table>" +
        "</div>"
    );

    var t = $('#mostrar');
    t.empty(); // Limpar conteúdo anterior se houver
    t.append(adicionar); // Adicionar a estrutura inicial

    // Preencher a tabela com base no valor inicial selecionado no select
    var selecionadoInicial = $('#informacoes').val();
    preencherTabela(selecionadoInicial);

    // Event listener para mudanças no select
    $('#informacoes').change(function() {
        var selecionado = $(this).val();
        preencherTabela(selecionado); // Chamar a função de preenchimento da tabela
    });
});

// Função auxiliar para mapear os ícones com base no status_veiculo
function getIcon(status) {
    switch (status) {
        case 'Aberto':
            return '<img class="icon" src="../img/Aberto.png"></img>';
        case 'Finalizado':
            return '<img class="icon" src="../img/Analise.png"></img>';
        case 'Aceito':
            return '<img class="icon" src="../img/Aceito.png"></img>';
        case 'Recusado':
            return '<img class="icon" src="../img/Recusado.png"></img>';
        default:
            return '';
    }
}


function mapStatus(status) {
    var map = {
        'Finalizado': 'Em análise',
        'Aberto': 'Aberta',
        'Aceito': 'Aceita',
        'Recusado': 'Recusada'
    };
    return map[status] || status;
}

}
