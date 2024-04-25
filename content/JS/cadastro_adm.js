function senhahash(senha) {
        var hash = CryptoJS.SHA256(senha).toString(CryptoJS.enc.Hex);
        return hash;
    }
    
    $(document).ready(function () {
        $('#cadastro').submit(function (e) {
            e.preventDefault();
    
            var ra = $('#ra').prop('value');
            var senha = $('#senha').prop('value');
    
            var senha_hash = senhahash(senha);
    
            var data = {
                ra: ra,
                senha: senha_hash
            };
    
            $.ajax({
                type: 'POST',
                url: '../PHP/cadastro_adm.php',
                data: data,
                success: function (data) {
                    conclusao(data);
                }
            });
        });
    });
    
    function conclusao(data) {
        if (data === true) {
            alert('Cadastro concluído com sucesso!');
            window.location.href = "entre-adm.html";
        } else {
            h(data);
        }
    }
    
    function h(data) {
        var t = $('#resposta_cadastro');
        t.empty();
        var resp = '<p>' + data + '</p>';
        t.append(resp);
    }
    