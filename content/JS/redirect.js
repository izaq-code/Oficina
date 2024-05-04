document.addEventListener('DOMContentLoaded', () => {
    const homeIcon = document.getElementById('homeIconas');
    const formIcon = document.getElementById('formIconas');
    const logout = document.getElementById('logout');
    
    if (homeIcon) {
        homeIcon.addEventListener('click', () => {
            window.location.href = 'pag-principal.html';
        });
    }
    
    if (formIcon) {
        formIcon.addEventListener('click', () => {
            window.location.href = 'Formulario as.html';
        });
    }

    if (logout) {
        logout.addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
    }
});
