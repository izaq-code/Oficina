function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    let icon = document.querySelector('.icon');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        icon.src = "../img/menu_black_36dp.svg"; // Volta para a imagem do menu
    } else {
        menuMobile.classList.add('open');
        icon.src = "../img/close_black_36dp.svg"; // Muda para a imagem de fechar
    }
}
