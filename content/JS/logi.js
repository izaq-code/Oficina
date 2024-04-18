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

var boxinput = document.querySelector('#box3');
var senhaInput = document.querySelector('#senha');
var confirmarSenhaInput = document.querySelector('#confirmarSenha');

function verificarSenhas() {
    var box = boxinput.value;
    var senha = senhaInput.value;
    var confirmarSenha = confirmarSenhaInput.value;

    if (senha === "" && confirmarSenha === "") {
        exibirTextoNaTela('#alerta', '');
        boxinput.style.backgroundcolor ="rgb(206, 0, 0);"
        senhaInput.style.boxShadow = "0 0 5px white";
        confirmarSenhaInput.style.boxShadow = "0 0 5px white";
        boxinput.classList.remove('accept');
        boxinput.classList.remove('error');
        boxinput.classList.remove('alerta');
        boxinput.classList.add('normal');

    } else if (senha === "" || confirmarSenha === "") {
        exibirTextoNaTela('#alerta', 'Preencha ambos os campos de senha');
        boxinput.style.backgroundcolor ="rgb(206, 0, 0);"
        senhaInput.style.boxShadow = "0 0 5px orange";
        confirmarSenhaInput.style.boxShadow = "0 0 5px orange";
        boxinput.classList.remove('accept');
        boxinput.classList.remove('error');
        boxinput.classList.remove('normal');
        boxinput.classList.add('alerta');

    } else if (senha !== confirmarSenha) {
        exibirTextoNaTela('#alerta', 'As senhas não coincidem');
        senhaInput.style.boxShadow = "0 0 5px red";
        confirmarSenhaInput.style.boxShadow = "0 0 5px red";
        boxinput.classList.remove('accept');
        boxinput.classList.remove('alerta');
        boxinput.classList.remove('normal');
        boxinput.classList.add('error');
    } else {
        exibirTextoNaTela('#alerta', ' ');
        senhaInput.style.boxShadow = "0 0 5px #1ec396";
        confirmarSenhaInput.style.boxShadow = "0 0 5px #1ec396";
        boxinput.classList.remove('erro');
        boxinput.classList.remove('alerta');
        boxinput.classList.remove('normal');
        boxinput.classList.add('accept');
    }   
}

confirmarSenhaInput.addEventListener('input', verificarSenhas);
senhaInput.addEventListener('input', verificarSenhas);
