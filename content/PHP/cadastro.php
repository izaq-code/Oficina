<?php

session_start();
include_once ('conexao.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if(isset($_SESSION['cod_seguradora'])){
        $cod_seguradora = $_SESSION['cod_seguradora'];
    } else {
        header("Location: ../HTML/entre-cliente.html ");
        die();
    }

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

    $sql = "INSERT INTO carro (nome_proprietario, cpf_proprietario, data_abertura, fabricante, marca,
     modelo, motorizacao, combustivel, cambio, cor, placa, chassi, hodometro, sinistro, status_veiculo, cod_seguradora) 
        VALUES ('$nome_proprietario', '$cpf_proprietario', curdate(), '$fabricante', '$marca', '$modelo', $motorizacao,
         '$combustivel', '$cambio', '$cor', '$placa', '$chassi', '$hodometro', '$sinistro', 'Aberto', '$cod_seguradora')";



    if ($conexao->query($sql) === TRUE) {
        echo "Inserção realizada com sucesso";
    } else {
        echo "Erro na inserção: " . $conexao->error;
    }




}
$conexao->close();
?>
