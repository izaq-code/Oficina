<?php
include_once('conexao.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $sql = mysqli_query ($conexao,"SELECT modelo, sinistro, status_veiculo 
                                    FROM carro
                                    Limit 3
")

    $informacoes = mysqli_query ($conexao, "SELECT SUM(CASE WHEN  status_veiculo = 'aberto' THEN 1 ELSE 0 END) as Aberto,
                                            SUM(CASE WHEN status_veiculo = 'Finilazado' THEN 1 ELSE 0 END) as Finalizado
                                            FROM carro    
")

$solicitacao = array();


while($row = mysqli_fetch_array($informacoes)) {
        $solicitacao[] = $row;
    }
    
$exibicao = array();
    
while($row = mysqli_fetch_array($sql)) {
        $exibicao[] = $row;
    }

$tiago = array(
    'solicitacao' => $solicitacao
    'exibicao' => $exibicao
);

 echo json_encode($tiago);

}

?>