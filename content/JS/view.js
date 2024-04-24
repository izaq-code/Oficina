function viewsenha(inputId, iconId) {
    var inputpass = document.getElementById(inputId);
    var icon = document.getElementById(iconId);

    if (inputpass.type === 'password') {
        inputpass.setAttribute('type', 'text');
        icon.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    } else {
        inputpass.setAttribute('type', 'password');
        icon.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    }
}
    