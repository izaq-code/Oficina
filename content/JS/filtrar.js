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
                    "</tr>"
                );

                tbody.append(row); // Adicionar a linha à tabela
                i++;
            });

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

// Função auxiliar para mapear os status_veiculo para exibição
function mapStatus(status) {
    var map = {
        'Finalizado': 'Em análise',
        'Aberto': 'Aberta',
        'Aceito': 'Aceita',
        'Recusado': 'Recusada'
    };
    return map[status] || status;
}
