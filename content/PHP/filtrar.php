<?php

include_once('conexao.php');

$selecionado = $_POST['selecionado'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $sql = mysqli_query($conexao, "SELECT cod_veiculo, id_personalizado, modelo, sinistro, status_veiculo 
                                    FROM carro
                                    WHERE  status_veiculo = '$selecionado'
");

    $status = array();

    while($row = (mysqli_fetch_array($sql))){
        $status[] = $row;
    }

    echo json_encode($status, JSON_UNESCAPED_SLASHES);
}
?>