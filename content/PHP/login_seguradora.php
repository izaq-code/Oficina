<?php

session_start();
include_once ("conexao.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $cnpj = $_POST['cnpj'];
    $senha = $_POST['senha'];

    $cnpj_hash = $cnpj;
    $senha_hash = $senha;

    $sql = "SELECT cod_seguradora FROM login_seguradora 
    WHERE cnpj = '$cnpj_hash' AND senha = '$senha_hash'";
    $result = $conexao->query($sql);

    if ($result->num_rows > 0) {

        echo json_encode(true);
        while ($row = mysqli_fetch_array($result)) {
            $cod = $row['cod_seguradora'];
        }
        $_SESSION['cod_seguradora'] = $cod;

    } else {

        echo json_encode(false);
    }
}
?>
