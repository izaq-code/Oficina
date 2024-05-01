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

}
