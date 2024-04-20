<?php

include_once ('conexao.php');

if ($_SERVER['REQUEST_METHOD'] == "POST") {

    $cod_veiculo = $_POST['cod_veiculo'];

    $sql = mysqli_query($conexao, "SELECT 
        nome_proprietario,
        sinistro,
        cpf_proprietario,
        data_abertura,
        fabricante,
        marca,
        modelo,
        motorizacao,
        combustivel,
        cambio,
        cor,
        placa,
        chassi,
        hodometro,
        Orcamento,
        Pecas_danificadas,
        status_veiculo
    FROM carro
    WHERE cod_veiculo = '$cod_veiculo'");

    $resposta = array();

    while ($row = mysqli_fetch_array($sql)) {
        $resposta[] = $row;
    }

    echo json_encode($resposta, JSON_UNESCAPED_SLASHES);

}



?>