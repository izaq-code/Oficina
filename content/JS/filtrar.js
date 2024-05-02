document.getElementById('informacoes').addEventListener('change', function() {
    var selecionado = this.value;

    $(document).ready(function (){
        $.ajax({
            type: 'POST',
            url: '../PHP/filtrar.php',
            data: {
                selecionado: selecionado
            },
            dataType: 'json',
            success: function(data){
    
                if(data.length > 0) {
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
                
                    var map = {
                        'Finalizado': 'Em análise',
                        'Aberto': 'Aberta',
                        'Aceito': 'Aceita',
                        'Recusado': 'Recusada'
                    };
                    
                    function m(match) {
                        return map[match] || match;
                    }
                
                    data.forEach(function (e) {
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
                
                        let iconeClass = '';
                        if (e['status_veiculo'] === 'Aberto') {
                            iconeClass = '<img class="icon" src="../img/Aberto.png"></img>';
                        } else if (e['status_veiculo'] === 'Finalizado') {
                            iconeClass = '<img class="icon" src="../img/Analise.png"></img>';
                        } else if (e['status_veiculo'] === 'Aceito') {
                            iconeClass = '<img class="icon" src="../img/Aceito.png"></img>';
                        } else if (e['status_veiculo'] === 'Recusado') {
                            iconeClass = '<img class="icon" src="../img/Recusado.png"></img>';
                        }
                
                        adicionar += (
                            "<tr class='card-solicitacoes' id='" + e['cod_veiculo'] + "'>" +
                            "<td>" + "<div class='solicitacao-icone'>" + iconeClass + "</div></td>" +
                            "<td class='solicitacao-texto'>" +
                            "<div class='solicitacao-id'>" + e['id_personalizado'] + "</div>" +
                            "<div class='solicitacao-numero'>Solicitação " + i + "</div>" +
                            "</td>" +
                            "<td class='solicitacao-texto'>" + e['modelo'] + "</td>" +
                            "<td>" + "<div class='" + statusClass + "'>" + e['status_veiculo'].replace(/\b(Finalizado|Aberto|Aceito|Recusado)\b/g, m) + "</div></td>" +
                            "<td>" + e['sinistro'] + "</td>" +
                            "<td class='solicitacao-detalhes' data-cod_veiculo='" + e['cod_veiculo'] + "'>Detalhes</td>" +
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
                
                } else {
                    $('#mostrar').text("Nenhum resultado encontrado.");
                }
            }
        });
    });
});
