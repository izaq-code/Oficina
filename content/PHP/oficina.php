<?php

include_once ('conexao.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $selecionado = $_POST["selecionado"];


    $sql = mysqli_query($conexao, "SELECT nome_proprietario, cpf_proprietario, fabricante, marca,
                     modelo, motorizacao, combustivel, cambio, cor, placa,
                     chassi, hodometro, orcamento, pecas_danificadas FROM carro
                     WHERE cod_veiculo = '$selecionado';
    ");


    $resultado = array(); // Array para armazenar os resultados

    while ($row = mysqli_fetch_assoc($sql)) {
        $resultado[] = $row; // Adiciona cada linha ao array de resultados
    }

    echo json_encode($resultado, JSON_UNESCAPED_SLASHES);
}
$conexao->close();
?>