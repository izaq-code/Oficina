<?php
include_once ('conexao.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $sql = mysqli_query($conexao, "SELECT cod_veiculo, id_personalizado, modelo, sinistro, status_veiculo 
                                    FROM carro
");

    $informacoes = mysqli_query($conexao, "SELECT SUM(CASE WHEN  status_veiculo = 'Aberto' THEN 1 ELSE 0 END),
                                            SUM(CASE WHEN status_veiculo = 'Finalizado' THEN 1 ELSE 0 END),
                                            SUM(CASE WHEN status_veiculo = 'Recusado' THEN 1 ELSE 0 END),
                                            SUM(CASE WHEN status_veiculo = 'Aceito' THEN 1 ELSE 0 END)
                                            FROM carro;   
");

    $seguradoras = mysqli_query($conexao, "SELECT login_seguradora.nome 'Seguradora', COUNT(carro.cod_seguradora) AS total_carros 
                                            FROM carro 
                                            INNER JOIN login_seguradora ON login_seguradora.cod_seguradora = carro.cod_seguradora 
                                            GROUP BY login_seguradora.nome;    
");

    $solicitacao = array();

    while ($row = mysqli_fetch_array($informacoes)) {
        $solicitacao[] = $row;
    }

    $exibicao = array();

    while ($row = mysqli_fetch_array($sql)) {
        $exibicao[] = $row;
    }

    $segura = array();
    $segura2 = array();


    while ($row = mysqli_fetch_array($seguradoras)){
        $segura[] = $row['Seguradora'];
        $segura2[] = $row['total_carros'];

    }

    $tiago = array(
        'solicitacao' => $solicitacao,
        'exibicao' => $exibicao,
        'segura_nomes' => $segura,
        'segura_numeros' =>$segura2
    );

    echo json_encode($tiago);

}

?>