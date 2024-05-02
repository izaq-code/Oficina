

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("bnte").addEventListener("click", function() {
        document.querySelector("#bnte").classList.toggle("active");
        document.querySelector("#bb").classList.toggle("active");
    });
    const nav = document.querySelector('.nav');
    const toggleButton = document.getElementById('bnte');
    const homeLink = document.querySelector('#home a');
    const listaLink = document.querySelector('#lista a');
    const emailFulano = document.querySelector('#email-fulano');
    const nomeFulano = document.querySelector('#nome-fulano');

    toggleButton.addEventListener('click', function() {
        nav.classList.toggle('active');

        if (nav.classList.contains('active')) {
            homeLink.style.display = 'inline-block';
            listaLink.style.display = 'inline-block';
            emailFulano.style.display = 'block'; // Mostrar email-fulano
            nomeFulano.style.display = 'block'; // Mostrar nome-fulano
        } else {
            homeLink.style.display = 'none';
            listaLink.style.display = 'none';
            emailFulano.style.display = 'none'; // Ocultar email-fulano
            nomeFulano.style.display = 'none'; // Ocultar nome-fulano
        }
    });
});

