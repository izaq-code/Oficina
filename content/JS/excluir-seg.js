var cod_veiculo = localStorage.getItem('codVeiculo');


   //excluir
   $(".excluir").click(function (event) {
       event.preventDefault();

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
            excluir();
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


function excluir() {

 
        $.ajax({
            url: '../PHP/excluir-seg.php',
            type: 'POST',
            data: {
                codd: cod_veiculo
            },
            success: function (response) {
                console.log('Resposta do servidor:', response); // Verifica a resposta do servidor
                Swal.fire({
                    icon: 'success',
                    title: 'deletado com sucesso!',
                    customClass: {
                        confirmButton: 'swal-button'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '../HTML/pag-principal.html';
                    }
                });

            },
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText;
                console.error('Erro ao enviar o formulário:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao deletar',
                    text: 'Por favor, tente novamente mais tarde.',
                    customClass: {
                        confirmButton: 'swal-button'
                    }
                });
            }
        });
 
};
