<?php

include_once("conexao.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cod = $_POST['codd'];
    $sql = "UPDATE carro set status_veiculo = 'Aceito' where cod_veiculo = '$cod'";

    if ($conexao->query($sql) === TRUE) {
        echo true;
    } else {
        echo "Erro na inserção: " . $conexao->error;
    }

}
$conexao->close();
?>