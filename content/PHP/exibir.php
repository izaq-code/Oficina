<?php

session_start();
include_once ('conexao.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $id = $_SESSION['id_usuario'];

    $sql = mysqli_query($conexao, "SELECT cod_veiculo, id_personalizado, modelo, sinistro, status_veiculo 
                                    FROM carro WHERE cod_seguradora = '$id';
");

    $informacoes = mysqli_query($conexao, "SELECT SUM(CASE WHEN  status_veiculo = 'aberto' THEN 1 ELSE 0 END),
                                            SUM(CASE WHEN status_veiculo = 'Finalizado' THEN 1 ELSE 0 END),
                                            SUM(CASE WHEN status_veiculo = 'Recusado' THEN 1 ELSE 0 END),
                                            SUM(CASE WHEN status_veiculo = 'Aceito' THEN 1 ELSE 0 END)
                                            FROM carro WHERE cod_seguradora = '$id';    
");

    $solicitacao = array();


    while ($row = mysqli_fetch_array($informacoes)) {
        $solicitacao[] = $row;
    }

    $exibicao = array();

    while ($row = mysqli_fetch_array($sql)) {
        $exibicao[] = $row;
    }

    $tiago = array(
        'solicitacao' => $solicitacao,
        'exibicao' => $exibicao
    );

    echo json_encode($tiago);

}

?>
