<?php

include_once ('conexao.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $selecionado = $_POST['selecionado'];

    if ($selecionado === 'Padrao') {
    $todos = mysqli_query($conexao, "SELECT cod_veiculo, id_personalizado, modelo, sinistro, status_veiculo 
                                     FROM carro
");

while ($row = (mysqli_fetch_array($todos))) {
    $todos_status[] = $row;
}

echo json_encode($todos_status,  JSON_UNESCAPED_SLASHES);
}else{

    $sql = mysqli_query($conexao, "SELECT cod_veiculo, id_personalizado, modelo, sinistro, status_veiculo 
                                    FROM carro
                                    WHERE  status_veiculo = '$selecionado'
");

    $status = array();
    $todos_status = array();

    while ($row = (mysqli_fetch_array($sql))) {
        $status[] = $row;
    }

    echo json_encode($status,   JSON_UNESCAPED_SLASHES);
}
}
?>