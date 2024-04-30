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
    //tratamento das informações escritas
    var map = {
        'Finalizado': 'Em análise',
        'Aberto': 'Aberta',
        'Aceito': 'Aceita',
        'Recusado': 'Recusada'
    };

    function m(match) {
        return map[match] || match;
    }

    for (var key in carro[0]) {
        if (!isNaN(key)) continue; // Ignorar chaves numéricas
        var divContent = "<div class='exibirtudo'>";
        divContent += "<h3>" + key + ":</h3>  " + "<p>" + carro[0][key].replace(/\b(Finalizado|Aberto|Aceito|Recusado)\b/g, m) + "</p>";
        divContent += "</div>";
        w.append(divContent);
    }
    //fim do tratamento de informações escritas

    //tratamento de fotos e anexos pdf, caso existam
    if (resp === true) {
        var ww = $('#exibirmaiss');
        ww.empty();
        var fotos = data.fotos;
        var pdf = data.pdf;
        var pdfCaminho = '../upload/' + pdf;



        for (var key in fotos[0]) {
            if (!isNaN(key)) continue; // Ignorar chaves numéricas
            var divContent = "<div class='exibirtuudo'>";
            divContent += "<div class='img-container'><img src='" + fotos[0][key] + "' class='imgg'></div><h3>" + key.replace('_', ' ') + ":</h3>";
            divContent += "<input type='checkbox' id='imagens' class='img-checkbox' data-caminho='" + fotos[0][key] + "'>";
            divContent += "</div>";
            ww.append(divContent);
        }

        if (pdf) {
            pdf = "<iframe  src='" + pdf + "'></iframe>";
            ww.append(pdf);
        }

        var download = "<button id='download-pdf'> Download-PDF </button>";
        ww.append(download);

        var download = "<button id='bnt-baixar'> Download </button>";
        ww.append(download);

        $("#download-pdf").click(function () {
            var link = document.createElement('a');
            link.href = pdfCaminho;
            link.download = 'Documento.pdf';
            link.target = '_self';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        $("#bnt-baixar").click(function () {
            var imagens_selecionadas = [];

            $(".img-checkbox:checked").each(function () {
                imagens_selecionadas.push($(this).data('caminho'));
            });

            if (imagens_selecionadas.length === 0) {
                alert('Nenhuma imagem selecionada para download');
                return;
            }

            var zip = new JSZip();
            var diretorioImagens = '../upload/';

            var promises = [];

            imagens_selecionadas.forEach(function (caminhoImagem) {
                var nomeArquivo = caminhoImagem.substring(caminhoImagem.lastIndexOf('/') + 1);
                var caminhoCompleto = diretorioImagens + nomeArquivo;

                var promise = fetch(caminhoCompleto)
                    .then(response => response.blob())
                    .then(blob => {
                        zip.file(nomeArquivo, blob, { binary: true });
                    });

                promises.push(promise);
            });

            Promise.all(promises).then(function () {
                zip.generateAsync({ type: 'blob' }).then(function (content) {
                    var zipNome = 'Imagens.zip';
                    var link = document.createElement('a');
                    link.download = zipNome;
                    link.href = URL.createObjectURL(content);
                    link.click();
                });
            });
        });

    }

    //fim do tratamento de fotos e anexos

    //tratamento de botões de atualizar e excluir

    //atualizar
    $(".atualizar").click(function (event) {
        event.preventDefault();

        localStorage.setItem('codVeiculo', cod_veiculo);

        window.location.href = '../HTML/atualizar-seg.html';
    });

    //excluir
    $(".excluir").click(function (event) {
        event.preventDefault();

        localStorage.setItem('codVeiculo', cod_veiculo);

        window.location.href = '../HTML/excluir-seg.html';
    });
}
