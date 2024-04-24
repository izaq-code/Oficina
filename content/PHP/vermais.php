<?php

include_once ('conexao.php');

if ($_SERVER['REQUEST_METHOD'] == "POST") {

    $cod_veiculo = $_POST['cod_veiculo'];

    $sql = mysqli_query($conexao, "SELECT
        id_personalizado 'ID', 
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
    WHERE cod_veiculo = '$cod_veiculo';");

    $carro = array();
    // $filtro = array();
    $fotos = array();
    $sim = false;

    while ($row = mysqli_fetch_array($sql)) {
        $carro[] = $row;
        $filtro = $row['Status da solicitação'];
    }

    if ($filtro === 'Finalizado') {
        $sim = true;
        $segunda_consulta = mysqli_query($conexao, "SELECT 
        chassi,
        hodometro,
        Frente,
        Trasseira,
        lateral_direita,
        Lateral_esquerda,
        Motor,
        Pecas_danificadas
    FROM carro_fotos
    WHERE cod_veiculo = '$cod_veiculo';");

        while ($row = mysqli_fetch_array($segunda_consulta)) {
            $fotos[] = $row;
        }

        $eu = array(
            'carro' => $carro,
            'sim' => $sim,
            'fotos' => $fotos
        );
    } else {
        $eu = array(
            'carro' => $carro,
            'sim' => $sim
        );
    }


    echo json_encode($eu, JSON_UNESCAPED_SLASHES);

}


?>
