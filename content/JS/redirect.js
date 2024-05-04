document.addEventListener('DOMContentLoaded', () => {
    const homeIcon = document.getElementById('homeIconas');
    const formIcon = document.getElementById('formIconas');
    const logout = document.getElementById('logout');
    const iconee = document.getElementById('iconee');

    if (homeIcon) {
        homeIcon.addEventListener('click', () => {
            window.location.href = 'pag-principal.html';
        });
    }
    
    if (formIcon) {
        formIcon.addEventListener('click', () => {
            window.location.href = 'Formulario as.html';
        });
    }

    if (logout) {
        logout.addEventListener('click', () => {
          
     
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
        
          });
          swalWithBootstrapButtons.fire({
            title: "Sair",
            text: "Deseja mesmo sair ?!",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sim, Sair!",
            cancelButtonText: "Não, cancelar!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                let timerInterval;
                Swal.fire({
                    icon: "success",
                  title: "Saindo",
                  html: "Você ira para tela inicial em <b></b> milliseconds.",
                  timer: 2000,
                  timerProgressBar: true,
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
             
                        window.location.href = '../../index.html';
                  
                  }
                });
             
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Que bom que deseja ficar mais :)",
                icon: "error"
              });
            }
          });
        });
    }
    

    if (iconee) {
        iconee.addEventListener('click', () => {
          
     
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
        
          });
          swalWithBootstrapButtons.fire({
            title: "Sair",
            text: "Deseja mesmo sair ?!",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sim, Sair!",
            cancelButtonText: "Não, cancelar!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                let timerInterval;
                Swal.fire({
                    icon: "success",
                  title: "Saindo",
                  html: "Você ira para tela inicial em <b></b> milliseconds.",
                  timer: 2000,
                  timerProgressBar: true,
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
             
                        window.location.href = '../../index.html';
                  
                  }
                });
             
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Que bom que deseja ficar mais :)",
                icon: "error"
              });
            }
          });
        });
    }

});
