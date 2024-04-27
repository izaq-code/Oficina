


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("bnte").addEventListener("click", function() {
        document.querySelector("#bnte").classList.toggle("active");
    });
    

    const nav = document.querySelector('.nav');
    const toggleButton = document.getElementById('bnte');
    const sairDiv = document.querySelector('#sair');

    const homeLink = document.querySelector('#home a');
    const listaLink = document.querySelector('#lista a');


        
    toggleButton.addEventListener('click', function() {
        nav.classList.toggle('active');


        
        if (nav.classList.contains('active')) {
            homeLink.style.display = 'inline-block';
            listaLink.style.display = 'inline-block';
            sairDiv.style.display = 'inline-block';
        } else {
            homeLink.style.display = 'none';
            listaLink.style.display = 'none';
            sairDiv.style.display = 'none';
        }
    });
});
