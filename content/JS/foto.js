

window.addEventListener("DOMContentLoaded", function () {
    const fotoContainers = document.querySelectorAll('.foto-container1');
    
    fotoContainers.forEach(function (container) {
        const inputFile = container.querySelector('.foto__input');
        const fotoImage = container.querySelector('.foto__image');
        const removeButton = container.querySelector('.remover-foto1');
        const fotoImageTxt = '';
  
   
  
        inputFile.addEventListener("change", function (e) {
            const inputTarget = e.target;
            const file = inputTarget.files[0];
            const index = inputTarget.dataset.index;
  
            if (file) {
                if (!file.type.startsWith('image/')) {
                    alert("Por favor, selecione uma imagem.");
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
         
         
            }
        });
  
        removeButton.addEventListener("click", function () {
            fotoImage.innerHTML = `${fotoImageTxt}`; 
            inputFile.value = ""; 
     
            inputFile.disabled = false;
        });
    });
  });
  
  
