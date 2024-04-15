$(document).ready(function(){
    $('#cadastro').submit(function(e){
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '../PHP/cadastro_adm.php',
            data: formData,
            success: function(data){
                conclusao(data);   
            }
        });
    });
});

function conclusao (data) {

    data == true ? alert('Cadastro concluído com sucesso !') . 
    window.location.href = "entre-adm.html" :  h(data);



}

function h(data){
    t = $('#resposta_cadastro');
    t.empty();
    resp = (
        '<p>'+ data +'</p>'
    )
    t.append(resp);
}