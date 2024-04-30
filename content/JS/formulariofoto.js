
// Evento DOMContentLoaded para inicializar o código após o carregamento da página
window.addEventListener("DOMContentLoaded", function () {
    const fotoContainers = document.querySelectorAll('.foto-container');
    
    fotoContainers.forEach(function (container) {
        const inputFile = container.querySelector('.foto__input');
        const fotoImage = container.querySelector('.foto__image');
        const removeButton = container.querySelector('.remover-foto');
        const fotoImageTxt = '';
  
        fotoImage.innerHTML = `<i class="bi bi-plus-lg" id="a"></i> ${fotoImageTxt}`;
  
        inputFile.addEventListener("change", function (e) {
            const inputTarget = e.target;
            const file = inputTarget.files[0];
            const index = inputTarget.dataset.index;
  
            if (file) {
                if (!file.type.startsWith('image/')) {
                    Swal.fire({
                        icon: "warning",
                        title: "Oops...",
                        text: "O arquivo escolhido não e uma foto",
                        footer: '<p>Preencha todos os campos corretamente!</p>',
                        customClass: {
                            confirmButton: 'swal-button' 
                        }
                      });
                    inputFile.value = '';
                    return;
                }
  
                const fileSizeLimit = 5 * 1024 * 1024;
                if (file.size > fileSizeLimit) {
                  Swal.fire({
                    icon: "error",
                    title: "Espaço excedido...",
                    text: "Apenas imagens abaixo de 5 MB",
                    footer: '<p>Imagem com valor igual ou superior a 5 mb</p>',
                    customClass: {
                        confirmButton: 'swal-button' 
                    }
                  });
                    inputFile.value = ''; 
                    return;
                }
  
                const reader = new FileReader();
  
                reader.addEventListener("load", function (e) {
                    const readerTarget = e.target;
  
                    const img = document.createElement("img");
                    img.src = readerTarget.result;
                    img.classList.add("foto__img");
  
                    fotoImage.innerHTML = "";
                    fotoImage.appendChild(img);
                    inputFile.disabled = true;
                });
  
                reader.readAsDataURL(file);
            } else {
                fotoImage.innerHTML = `<i class="bi bi-plus-lg" id="a"></i> ${fotoImageTxt}`;
            }
        });
  
        removeButton.addEventListener("click", function () {
            fotoImage.innerHTML = `<i class="bi bi-plus-lg" id="a"></i> ${fotoImageTxt}`; 
            inputFile.value = ""; 
            inputFile.disabled = false;
        });
    });
  });
  