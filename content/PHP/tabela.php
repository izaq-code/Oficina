<?php
include_once("conexao.php");

if($_SERVER["REQUEST_METHOD"] == "POST") {

    $sql = mysqli_query($conexao, "SELECT cod_veiculo AS cod, nome_proprietario AS nome 
    FROM carro 
    WHERE status_veiculo = 'aberto'");

    $resultado = array();

    $resultado[] = '<option value="" disabled selected>Escolha uma opção</option>';

    while($row = mysqli_fetch_array($sql)) {
        $resultado[] = "<option value='" . $row['cod'] . "'>" . $row['nome']. "</option>";
    }

    echo json_encode($resultado, JSON_UNESCAPED_SLASHES);

}


?>
