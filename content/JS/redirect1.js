document.addEventListener('DOMContentLoaded', () => {
    const homeIcon = document.getElementById('homeIconof');
    const formIcon = document.getElementById('formIconof');
    const logout = document.getElementById('logout');

    if (homeIcon) {
        homeIcon.addEventListener('click', () => {
            window.location.href = 'pag-principal-oficina.html';
        });
    }
    
    if (formIcon) {
        formIcon.addEventListener('click', () => {
            window.location.href = 'Formulario of.html';
        });
    }

    if (logout) {
        logout.addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
    }
});