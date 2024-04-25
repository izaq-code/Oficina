document.addEventListener("DOMContentLoaded", exibirDados);

function exibirDados() {
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

function exibir(data) {

    //iterando sobre os elementos do array
    carro = data.carro;
    resp = data.sim;


    w = $('#exibirmais');
    w.empty();

    for (var key in carro[0]) {
        if (!isNaN(key)) continue; // Ignorar chaves numéricas
        var divContent = "<div class='exibirtudo'>";
        divContent += "<h3>" + key.replace('_', ' ') + ":</h3>  " + "<p>" + carro[0][key] + "</p>";
        divContent += "</div>";
        w.append(divContent);
    }

    if (resp === true) {
        ww = $('#exibirmaiss');
        ww.empty();
        fotos = data.fotos;

        for (var key in fotos[0]) {
            if (!isNaN(key)) continue; // Ignorar chaves numéricas
            var divContent = "<div class='exibirtuudo'>";
            divContent +=  "<div class='img-conteiner'><img  src = '"+ fotos[0][key] +"'class='imgg'></div> <h3>" + key.replace('_', ' ') + ":</h3><br>" ;
            divContent += "</div>";
            ww.append(divContent);
        }


    }

}
