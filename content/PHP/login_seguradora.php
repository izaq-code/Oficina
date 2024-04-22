<?php
    include_once("conexao.php");

    if($_SERVER['REQUEST_METHOD'] == "POST"){

    $cnpj = $_POST['cnpj'];
    $senha = $_POST['senha'];

    $sql = "SELECT cod_seguradora FROM login_seguradora
     WHERE cnpj = '$cnpj'
     and senha = '$senha'";
}

$resultado = mysqli_query($conexao, $sql);

if (mysqli_num_rows($resultado) > 0) {

    $sim = true;
} else {
    $sim = false;
} 
    echo json_encode($sim);
?>