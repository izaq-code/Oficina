document.addEventListener("DOMContentLoaded", exibirDados);

function exibirDados () {
    var cod_veiculo = localStorage.getItem('codVeiculo');
    
    $.ajax({
        type: 'POST',
        url: '../PHP/vermais.php',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        data: {
            cod_veiculo: cod_veiculo
        },
        success: function (data) {
            exibir(data);
        }
    });
}

function exibir (data) {

    carro = data.carro;

     w =  $('#exibirmais');
     w.empty();

    for (var key in data[0]) {
        if (!isNaN(key)) continue; // Ignorar chaves numéricas
        var divContent = "<div class='exibirtudo'>";
         divContent += "<h3>" + key.replace('_', ' ') + ":</h3>" + "<p>" + data[0][key] + "</p>";
         divContent += "</div>";
         w.append(divContent);
        }
        
}
