document.addEventListener("DOMContentLoaded", exibirDados);

    var cod_veiculo = localStorage.getItem('codVeiculo');
function exibirDados() {

    $.ajax({
        type: 'POST',
        url: '../PHP/vermais-oficina.php',
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
        divContent += "<h3>" + key + ":</h3>  " + "<p>" + (carro[0][key] ? carro[0][key].replace(/\b(Finalizado|Aberto|Aceito|Recusado)\b/g, m) : '') + "</p>";
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
        var status = data.status;
        var pdfCaminho = '../upload/' + pdf;



        for (var key in fotos[0]) {
            if (!isNaN(key)) continue; // Ignorar chaves numéricas
            var divContent = "<div class='exibirtuudo'>";
            divContent += "<div class='container-img'>";
            divContent += "<div class='img-container'>";
            divContent += "<img src='" + fotos[0][key] + "' class='imgg'>";
            divContent += "</div>";
            divContent += "<div class='text-container'>";
            divContent += "<div id='texto-div'><h3>" + key.replace('_', ' ') + ":</h3></div>";
            divContent += "<input type='checkbox' id='imagens' class='img-checkbox' data-caminho='" + fotos[0][key] + "'>";
            divContent += "</div>";
            divContent += "</div>";
            
            ww.append(divContent);
        }

        if (pdf) {
            pdf= "<div id='iframeandre'><div id='texto-titulo-pdf'>Visulizar o pdf</div><iframe id='pdf' src='" + pdf + "'></iframe></div>";
           ww.append(pdf); 
       }   

       if (status === 'Recusado') {
       var atualizar = "<button id='atualizar1'> Atualizar <i class='bi bi-cloud-arrow-up-fill'></i> </button>";
       ww.append(atualizar);

       $('#atualizar').click(function() {
        window.location.href = '../HTML/Formulario-of-Atualizar.html';
    });
};

       var download = "<button id='download-pdf'> Download PDF  <i class='bi bi-file-earmark-pdf'></i> </button>";
       ww.append(download);

       var download = "<button id='bnt-baixar'> Download img <i class='bi bi-image'></i> </button>";
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
            Swal.fire({
                icon: "error",
                title: "Nenhuma imagem selecionada...",
                text:"Selecione uma imagem para fazer o download",

                customClass: {
                    confirmButton: 'swal-button' 
                }
              });
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

       const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
     
      });
      swalWithBootstrapButtons.fire({
        title: "Tem certeza que deseja deletar?",
        text: "concordando com isso você estará deletando a solicitação!",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sim, deletar!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Deletado!",
            text: "Sua solicitação foi deletada.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Você cancelou a exclusão da solicitação",
            icon: "error"
          });
        }
      });
   });
}
