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
    var h = "<img style='width: 100%; height: 100%;'src='" + data.foto_perfil + "'>";
    w.append(h);

}
