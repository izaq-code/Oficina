$(document).ready(function () {
    $('#cadastrar').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: './PHP/cadastro.php',
            data: formData,
            dataType: 'json',
            success: function(data){
                mostrar(data);
                alert('Cadastrado com sucesso');
            },
            error: function(xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText;
                console.error('Erro ao cadastrar:', errorMessage); // Exibe o erro no console
                alert('Erro ao cadastrar: ' + errorMessage);
            }
        })
    })
})

function mostrar(data) {
    $('#Nome_paciente').val(data[0].nome_paciente);
    $('#cpf').val(data[0].cpf_paciente);
    $('#rg').val(data[0].rg_paciente);
    $('#data').val(data[0].data_nascimento);
    $('#nome_responsavel').val(data[0].nome_responsavel);
    $('#Telefone').val(data[0].telefone_paciente);
    $('#carterinha').val(data[0]. carteira_convenio);
    $('#Nacionalidade').val(data[0].nacionalidade_paciente);
    $('#Contato_emergencia').val(data[0].contato_emergencia);
    $('#cpf_responsavel').val(data[0].cpf_responsavel);
    $('#cep').val(data[0].cep_paciente);
    $('#estado_civil').val(data[0].estado_civil);
    $('#sexo').val(data[0].sexo);
    $('#tipo_sanguineo').val(data[0].tipo_sanguineo);
    $('#Numero_responsavel').val(data[0].numero_responsavel);
}