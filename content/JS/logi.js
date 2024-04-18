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

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

var senhaInput = document.querySelector('#senha');
var confirmarSenhaInput = document.querySelector('#confirmarSenha');

function verificarSenhas() {
    var senha = senhaInput.value;
    var confirmarSenha = confirmarSenhaInput.value;

    if (senha === "" || confirmarSenha === "") {
        exibirTextoNaTela('#alerta', 'Preencha ambos os campos de senha');
        senhaInput.style.boxShadow = "0 0 5px red";
        confirmarSenhaInput.style.boxShadow = "0 0 5px red";
    } else if (senha !== confirmarSenha) {
        exibirTextoNaTela('#alerta', 'As senhas não coincidem');
        senhaInput.style.boxShadow = "0 0 5px red";
        confirmarSenhaInput.style.boxShadow = "0 0 5px red";
    } else {
        exibirTextoNaTela('#alerta', ' ');
        senhaInput.style.boxShadow = "0 0 5px #1ec396";
        confirmarSenhaInput.style.boxShadow = "0 0 5px #1ec396";
    }
}

confirmarSenhaInput.addEventListener('input', verificarSenhas);
senhaInput.addEventListener('input', verificarSenhas);
