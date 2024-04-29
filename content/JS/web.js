document.addEventListener("DOMContentLoaded", function () {
  const slidePage = document.querySelector(".slide-page");
  const nextBtnFirst = document.querySelector(".next");
  const prevBtnSec = document.querySelector(".prev-1");
  const nextBtnSec = document.querySelector(".next-1");
  const prevBtnThird = document.querySelector(".prev-2");
  const nextBtnThird = document.querySelector(".next-2");
  const prevBtnFourth = document.querySelector(".prev-3");
  const form = document.getElementById('uploadImagens');

  const progressText = document.querySelectorAll(".step p");
  const progressCheck = document.querySelectorAll(".step .check");
  const bullet = document.querySelectorAll(".step .bullet");
  let max = 4;
  let current = 1;

  function validateFields() {
    const currentPage = document.querySelector(`.page:nth-child(${current})`);
    const inputFields = currentPage.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputFields.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
      }
    });

    return isValid;
  }

  function goToNextStep() {
    if (current === 3 && !document.getElementById('pdfFile').files.length) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Selecione um arquivo PDF antes de avançar!",
        footer: '<p>Por favor, escolha um arquivo PDF.</p>'
      });
      return;
    }

    if (!validateFields()) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Campos incompletos!",
        footer: '<p>Preencha todos os campos obrigatórios!</p>'
      });
      return;
    }

    slidePage.style.marginLeft = `-${current * 25}%`;
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
  }

  function goToPrevStep() {
    slidePage.style.marginLeft = `-${(current - 2) * 25}%`;
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
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

  // Capturando o envio do formulário
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    if (!validateFields()) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Campos incompletos!",
        footer: '<p>Preencha todos os campos obrigatórios!</p>'
      });
      return;
    }

    fetch('../PHP/upload.php', {
      method: 'POST',
      body: new FormData(form)
    })
    .then(response => response.text())
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: 'Enviado com sucesso!',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    })
    .catch(error => {
      console.error('Erro ao enviar o formulário:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao enviar o formulário',
        text: 'Por favor, tente novamente mais tarde.'
      });
    });
  });
});
