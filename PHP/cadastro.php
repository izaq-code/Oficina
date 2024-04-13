<?php

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
    $orcamento = $_POST['orcamento'];
    $pecas_danificadas = $_POST['pecas_danificadas'];

    $sql = "INSERT INTO carro (nome_proprietario, cpf_proprietario, fabricante, marca,
     modelo, motorizacao, combustivel, cambio, cor, placa, chassi, hodometro, orcamento, pecas_danificadas) 
        VALUES ('$nome_proprietario', '$cpf_proprietario', '$fabricante', '$marca', '$modelo', $motorizacao, '$combustivel', '$cambio', '$cor', '$placa', '$chassi', '$hodometro', '$orcamento', '$pecas_danificadas')";



    if ($conexao->query($sql) === TRUE) {
        echo "Inserção realizada com sucesso";
    } else {
        echo "Erro na inserção: " . $conexao->error;
    }




}
$conexao->close();
?>