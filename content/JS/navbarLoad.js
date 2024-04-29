document.addEventListener("DOMContentLoaded", function(){
    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: '../PHP/navbarLoad.php',
            data: data,
            dataType: 'json',

            success: function (data) {
                conclusao(data);
            }
        });
    })
})

function conclusa (data) {
    t = $('#nome-fulano');
    t.empty();

    t.append(data[0].nome_fulano);

    q = $('#email-fulano');
    q.empty();

    t.append(data[0].email_fulano);

}