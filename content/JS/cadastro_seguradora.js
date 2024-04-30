
function hashSenha(senha) {
    var hash = CryptoJS.SHA256(senha).toString(CryptoJS.enc.Hex);
    return hash;
}

$(document).ready(function(){
    $('#cadastrar_seguradora').submit(function(e){
        e.preventDefault();

        var nome = $('[id="nome"]').val();
        var email = $('[id="email"]').val();
        var cnpj = $('[id="cnpj"]').val();
        var senha = $('[id="senha"]').val();

        var senha_hash = hashSenha(senha);
        
        var formData = new FormData();
        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('cnpj', cnpj); 
        formData.append('senha', senha_hash);
 
        $.ajax({
            type: 'POST',
            url: '../PHP/cadastro_seguradora.php',
            data: formData,
            processData: false,  
            contentType: false,  
            success: function(response){
                let timerInterval;
                Swal.fire({
                  icon:"success",
                  title: "Seguradora cadastrada!",
                  html: "Você sera redirecionando em <b></b> milisegundos .",
                  timer: 5000,
                  timerProgressBar: true,
                  heightAuto: false,  // Evita o redimensionamento automático da tela
                  didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                      timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                  },
                  willClose: () => {
                    clearInterval(timerInterval);
                  }
                }).then((result) => {
                  /* Read more about handling dismissals below */
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("o times fechou certo");
                    window.location.href = "entre-cliente.html";
                  }
                })
            }, 
            error: function(xhr, status, error){
                var erro = xhr.status + ': ' + xhr.statusText;
                console.error('Erro ao cadastrar:', erro);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Erro ao cadastrar!",
                    footer: '<p>Tente novamente</p>'
                  });
            }
        });
    });
});

function a(response){
     t = $('#alerta');
     t.empty();
     resp = (
        '<p>' + response + '</p>'
     )
     t.append(resp);
}


