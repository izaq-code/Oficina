function senhahash(senha) {
        var hash = CryptoJS.SHA256(senha).toString(CryptoJS.enc.Hex);
        return hash;
    }
    
    $(document).ready(function () {
        $('#cadastro').submit(function (e) {
            e.preventDefault();
    
            var ra = $('#ra').prop('value');
            var senha = $('#senha').prop('value');
    
            var senha_hash = senhahash(senha);
    
            var data = {
                ra: ra,
                senha: senha_hash
            };
    
            $.ajax({
                type: 'POST',
                url: '../PHP/cadastro_adm.php',
                data: data,
                success: function (data) {
                    conclusao(data);
                }
            });
        });
    });
    
    function conclusao(data) {
        if (data === true) {

                let timerInterval;
                Swal.fire({
                  icon:"success",
                  title: "Funcionario cadastrado!",
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
                    alert('Cadastro concluído com sucesso!');
                    window.location.href = "entre-adm.html";
                  }
                })
      
        } else {
            h(data);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Erro ao cadastrar!",
                footer: '<p>Tente novamente</p>'
              });
        }
    }
    
    function h(data) {
        var t = $('#resposta_cadastro');
        t.empty();
        var resp = '<p>' + data + '</p>';
        t.append(resp);
    }
    