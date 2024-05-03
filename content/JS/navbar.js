document.addEventListener("DOMContentLoaded", function() {

    const nav = document.querySelector('.nav');
    const toggleButton = document.getElementById('bnte');
    const iconee = document.querySelector('#iconee');
    const homeLink = document.querySelector('#home a');
    const listaLink = document.querySelector('#lista a');
    const emailFulano = document.querySelector('#email-fulano');
    const nomeFulano = document.querySelector('#nome-fulano');

    toggleButton.addEventListener('click', function() {
        nav.classList.toggle('active');
        toggleButton.classList.toggle('active'); 
        document.querySelector("#bb").classList.toggle("active");

        if (nav.classList.contains('active')) {
            homeLink.style.display = 'inline-block';
            listaLink.style.display = 'inline-block';
            emailFulano.style.display = 'block'; 
            nomeFulano.style.display = 'block'; 
            iconee.classList.add('active'); 
        } else {
            homeLink.style.display = 'none';
            listaLink.style.display = 'none';
            emailFulano.style.display = 'none'; 
            nomeFulano.style.display = 'none'; 
            iconee.classList.remove('active'); 
        }
    });
});