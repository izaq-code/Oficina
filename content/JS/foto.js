

window.addEventListener("DOMContentLoaded", function () {
    const fotoContainers = document.querySelectorAll('.foto-container1');
    
    fotoContainers.forEach(function (container) {
        const inputFile = container.querySelector('.foto__input');
        const fotoImage = container.querySelector('.foto__image');
        const removeButton = container.querySelector('.remover-foto1');
        const fotoImageTxt = '';
  
        fotoImage.innerHTML = `<i class="bi bi-plus-lg" id="a"></i> ${fotoImageTxt}`;
  
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
                    alert("O tamanho do arquivo excede o limite permitido (5MB).");
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
  
  