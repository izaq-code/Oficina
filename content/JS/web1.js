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

