<?php

include_once("conexao.php");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ra = $_POST['ra'];
    $senha = $_POST['senha'];
    $sql = "SELECT cod_ra FROM ra WHERE RA = '$ra'";

    $resultado = mysqli_query($conexao, $sql);

    ;

    if (mysqli_num_rows($resultado) > 0) {

    $row = mysqli_fetch_assoc($resultado);
    $cod = $row['cod_ra'];
    
    $cadastro = "INSERT INTO login_adm (senha_adm, cod_ra) VALUES ('$senha', '$cod')";

    if ($conexao->query($cadastro) === TRUE) {
        echo true;
    } else {
        echo "Erro na inserção: " . $conexao->error;
    }

    } else {
        echo 'RA não cadastrado !';
    }
}
$conexao->close();
?>