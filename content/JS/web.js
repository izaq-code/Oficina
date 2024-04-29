const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const progressText = [...document.querySelectorAll(".step p")];
const progressCheck = [...document.querySelectorAll(".step .check")];
const bullet = [...document.querySelectorAll(".step .bullet")];
let max = 4;
let current = 1;

function validateFields() {
  const currentPage = document.querySelector(`.page:nth-child(${current})`);
  const inputFields = currentPage.querySelectorAll('input[type="text"], input[type="number"]');
  let isValid = true;


  inputFields.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      return;
    }
  });


  const fotoContainers = currentPage.querySelectorAll('.foto-container');
  fotoContainers.forEach((container) => {
    const inputFile = container.querySelector('.foto__input');
    if (inputFile && !inputFile.files.length) {
      isValid = false;
      return; 
    }
  });

  return isValid;
}


function goToNextStep() {

  if (!validateFields()) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Campos incompletos!",
      footer: '<p>Preencha todos os campos!</p>'
    });
    return;
  }


  slidePage.style.marginLeft = `-${current * 25}%`;
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
}


nextBtnFirst.addEventListener("click", function(event) {
  event.preventDefault();
  goToNextStep();
});

nextBtnSec.addEventListener("click", function(event) {
  event.preventDefault(); 
  goToNextStep();
});

nextBtnThird.addEventListener("click", function(event) {
  event.preventDefault(); 
  goToNextStep();
});


function goToPrevStep() {
  slidePage.style.marginLeft = `-${(current - 2) * 25}%`;
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
}

prevBtnSec.addEventListener("click", function(event) {
  event.preventDefault(); 
  goToPrevStep();
});

prevBtnThird.addEventListener("click", function(event) {
  event.preventDefault(); 
  goToPrevStep();
});

prevBtnFourth.addEventListener("click", function(event) {
  event.preventDefault(); 
  goToPrevStep();
});




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
                  footer: '<p>Imagem com valor igual ou superior a 5 mb</p>'
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

