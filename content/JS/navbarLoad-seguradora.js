document.addEventListener("DOMContentLoaded", function(){
    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: '../PHP/navbarLoad.php',
            dataType: 'json',

            success: function (data) {
                conclusao(data);
            }
        });
    })
})

function conclusao (data) {
    t = $('#nome-fulano');
    t.empty();
    t.append(data.nome_fulano);

    q = $('#email-fulano');
    q.empty();

    q.append(data.email_fulano);

    w = $('#foto-perfil');
    w.empty();
        
    var h = "<img id='banana' style='width: 100%; height: 100%; cursor: pointer; border-radius: 10px;' src='" + data.foto_perfil + "'>";


    var container = document.getElementById('foto-perfil');
    container.innerHTML = h; 

    var foto = document.getElementById('banana');
    if (foto) {
        foto.addEventListener('click', () => {
            console.log('Clicou na imagem!');
            window.location.href = 'perfil-usuario-seguradora.html';
        });
    } else {
        console.log('Elemento com ID "banana" não encontrado!');
    }

}
