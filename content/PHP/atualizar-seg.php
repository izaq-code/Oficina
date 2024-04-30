<?php

session_start();
include_once ('conexao.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    

    $nome_proprietario = $_POST['nome_proprietario'];
    $cpf_proprietario = $_POST['cpf_proprietario'];
    $fabricante = $_POST['fabricante'];
    $marca = $_POST['marca'];
    $modelo = $_POST['modelo'];
    $motorizacao = $_POST['motorizacao'];
    $combustivel = $_POST['combustivel'];
    $cambio = $_POST['cambio'];
    $cor = $_POST['cor'];
    $placa = $_POST['placa'];
    $chassi = $_POST['chassi'];
    $hodometro = $_POST['hodometro'];
    $sinistro = $_POST['sinistro'];
    $where = $_POST['cod_veiculo'];

    $sql = "UPDATE carro
    SET nome_proprietario = '$nome_proprietario',
        cpf_proprietario = '$cpf_proprietario',
        fabricante = '$fabricante',
        marca = '$marca',
        modelo = '$modelo',
        motorizacao = $motorizacao,
        combustivel = '$combustivel',
        cambio = '$cambio',
        cor = '$cor',
        placa = '$placa',
        chassi = '$chassi',
        hodometro = '$hodometro',
        sinistro = '$sinistro'
        WHERE cod_veiculo = '$where';
    ";



    if ($conexao->query($sql) === TRUE) {
        echo "Inserção realizada com sucesso";
    } else {
        echo "Erro na inserção: " . $conexao->error;
    }




}
$conexao->close();
?>
