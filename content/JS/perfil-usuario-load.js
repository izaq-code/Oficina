window.addEventListener("load", preencher);
function preencher() {
    $(document).ready(function () {
        $.ajax({
            type: 'POST',
            url: '../PHP/perfil-usuario-load.php',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: 'json',
            success: function (data) {
                console.log(data.resultado[2]);
                console.log(data.isOf);


                data.isOf == true ? exibir2(data) : exibir(data.resultado);

                // alert('descansar né');
                exibir(data);
            }
        });
    });
}

function exibir(data) {

    // iterando sobre os elementos do array
    var nome = data.resultado[0];
    var email = data.resultado[1];
    var foto = data.resultado[2];

    //fim da iteração

    //enviando os elementos para o html
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
function exibir2(data) {
    // iterando sobre os elementos do array
    var nome = data.resultado[0];
    var email = data.resultado[1];
    var foto = data.resultado[2];

    //fim da iteração

    //enviando os elementos para o html
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
    t = $('#nome');
    t.empty();
    t.append(nome);
    //email
    t = $('#email');
    t.empty();
    t.append(email);

}
