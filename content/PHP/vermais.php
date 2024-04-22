<?php

include_once ('conexao.php');

if ($_SERVER['REQUEST_METHOD'] == "POST") {

    $cod_veiculo = $_POST['cod_veiculo'];

    $sql = mysqli_query($conexao, "SELECT 
        nome_proprietario 'Nome do Proprietário',
        sinistro 'Sinistro',
        cpf_proprietario 'CPF do Proprietario',
        data_abertura 'Data de abertura',
        fabricante 'Fabricante',
        marca 'Marca',
        modelo 'Modelo',
        motorizacao 'Motorização',
        combustivel 'Combustível',
        cambio 'Câmbio',
        cor 'Cor',
        placa 'Placa',
        chassi 'Chassi',
        hodometro 'Hodômetro',
        Orcamento 'Orçamento',
        Pecas_danificadas 'Peças danificadas',
        status_veiculo 'Status da solicitação'
    FROM carro
    WHERE cod_veiculo = '$cod_veiculo'");

    $resposta = array();

    while ($row = mysqli_fetch_array($sql)) {
        $resposta[] = $row;
    }

    echo json_encode($resposta, JSON_UNESCAPED_SLASHES);

}



?>
