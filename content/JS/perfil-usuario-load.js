window.addEventListener("load", preencher);
function preencher() {
    $(document).ready(function () {
        $.ajax({
            type: 'POST',
            url: '../PHP/perfil-usuario-load.php',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                // alert('descansar né');
                exibir(data);
            }
        });
    });
}

function exibir(data) {

    // iterando sobre os elementos do array
    var nome = data[0];
    var email = data[1];
    var foto = data[2];

    //fim da iteração

    //enviando os elementos para o html
    //foto
    var elementos = document.querySelectorAll('.foto1');

    // Itera sobre cada elemento
    elementos.forEach(function (elemento) {
        // Altera o background do elemento
        elemento.style.background = 'url(' + foto + ')';
        elemento.style.backgroundSize = "cover";

    });

    $('#foto__input9').change(function () {
        var input = this;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#previewImage').attr('src', foto).show();
            }
            reader.readAsDataURL(input.files[0]);
        }
    });

    //nome
    $('#nome').val(nome);

    //email
    $('#email').val(email);

}