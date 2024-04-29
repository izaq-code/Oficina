
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

var senhaInput = document.querySelector('#senha');
var confirmarSenhaInput = document.querySelector('#confirmarSenha');

function verificarSenhas() {

    var senha = senhaInput.value;
    var confirmarSenha = confirmarSenhaInput.value;

    if (senha === "" && confirmarSenha === "") {
        exibirTextoNaTela('#alerta', '');

        senhaInput.style.boxShadow = "0 0 5px white";
        confirmarSenhaInput.style.boxShadow = "0 0 5px white";
   
    } else if (senha === "" || confirmarSenha === "") {
        exibirTextoNaTela('#alerta', 'Preencha ambos os campos de senha');

        senhaInput.style.boxShadow = "0 0 5px orange";
        confirmarSenhaInput.style.boxShadow = "0 0 5px orange";
    

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
