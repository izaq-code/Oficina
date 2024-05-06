function hashSenha(senha) {
    var hash = CryptoJS.SHA256(senha).toString(CryptoJS.enc.Hex);
    return hash;
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, '');

  if (cnpj.length !== 14) {
      return false;
  }
  
  if (/^(\d)\1+$/.test(cnpj)) {
      return false;
  }

  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso--;
      if (peso < 2) {
          peso = 9;
      }
  }
  let digito1 = 11 - (soma % 11);
  if (digito1 > 9) {
      digito1 = 0;
  }

  
  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso--;
      if (peso < 2) {
          peso = 9;
      }
  }
  let digito2 = 11 - (soma % 11);
  if (digito2 > 9) {
      digito2 = 0;
  }

  if (parseInt(cnpj.charAt(12)) === digito1 && parseInt(cnpj.charAt(13)) === digito2) {
      return true;
  } else {
      return false;
  }
}

$(document).ready(function(){
    $('#cadastrar_seguradora').submit(function(e){
        e.preventDefault();

        var nome = $('[id="nome"]').val();
        var email = $('[id="email"]').val();
        var cnpj = $('[id="cnpj"]').val();
        var senha = $('[id="senha"]').val();

        var senha_hash = hashSenha(senha);

        if (!validarCNPJ(cnpj)) {
          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "CNPJ inválido!",
              heightAuto: false
          });
          return;
      }

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
                if (response == false) {
                  a();
                  return
                }

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
                    footer: '<p>Tente novamente</p>',
                    heightAuto: false
                  });
            }
        });
    });
});

function a(){
  Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Digite um email válido ! (Ex: seguradora@email.com)",
      footer: '<p>Tente novamente</p>',
      heightAuto: false
    });
}
