<?php

include_once("conexao.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $cod = $_POST['codd'];
    $sql = "DELETE FROM carro where cod_veiculo = '$cod'";

    if ($conexao->query($sql) === TRUE) {
        echo true;
    } else {
        echo "Erro na inserção: " . $conexao->error;
    }

}
$conexao->close();
?>