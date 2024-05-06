var cod_veiculo = localStorage.getItem('codVeiculo');


   //mudar
   $(document).on('click', '#recusar', function (event) {
       event.preventDefault();

       const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
     
      });
      swalWithBootstrapButtons.fire({
        title: "Tem certeza que deseja recusar?",
        text: "concordando com isso você estará deletando a solicitação!",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sim, deletar!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            mudar();
          swalWithBootstrapButtons.fire({
            title: "Atualizado!",
            text: "Sua solicitação foi atualizada.",
            icon: "success"
          });
        //   window.location.href = '../HTML/pag-principal.html';
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Você cancelou a atualização da solicitação",
            icon: "error"
          });
        }
      });
   });


function mudar() {

 
        $.ajax({
            url: '../PHP/mudar-recusar.php',
            type: 'POST',
            data: {
                codd: cod_veiculo
            },
            success: function (response) {
                console.log('Resposta do servidor:', response); // Verifica a resposta do servidor
                Swal.fire({
                    icon: 'success',
                    title: 'atualizado com sucesso!',
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
                    title: 'Erro ao atualizar',
                    text: 'Por favor, tente novamente mais tarde.',
                    customClass: {
                        confirmButton: 'swal-button'
                    }
                });
            }
        });
 
};
