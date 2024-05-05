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

    if ($filtro) {
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

     
            $sim = true;
            $terceira_consulta = mysqli_query($conexao, "SELECT Orcamento
    FROM carro_fotos
    WHERE cod_veiculo = '$cod_veiculo';");
        
        $sim = true;
        $quarta_consulta = mysqli_query($conexao, "SELECT  status_veiculo
    FROM carro
    WHERE cod_veiculo = '$cod_veiculo';");

    
    while ($row = mysqli_fetch_array($quarta_consulta)) {
        $status = $row['status_veiculo'];
   }

        while ($row = mysqli_fetch_array($terceira_consulta)) {
             $pdf = $row['Orcamento'];
        }

        while ($row = mysqli_fetch_array($segunda_consulta)) {
            $fotos[] = $row;
        }

        if(!isset($pdf)){
            $pdf = 1;
        }

        $eu = array(
            'carro' => $carro,
            'sim' => $sim,
            'fotos' => $fotos,
            'pdf' => $pdf,
            'status' => $status
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
