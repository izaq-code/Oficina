<?php

include_once ("conexao.php");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    $sql = "SELECT cod_funcionario from login_funcionario where email_funcionario = '$email' and senha_funcionario = '$senha'";
    $resultado = mysqli_query($conexao, $sql);

    if (mysqli_num_rows($resultado) > 0) {

        $sim = true;
    } else {
        $sim = false;
    }

    if ($sim == true) {

        while ($row = mysqli_fetch_array($resultado)) {
            $cod = $row['cod_funcionario'];
        }

    } else {
        $cod = '';
    }



    echo json_encode(array($sim, $cod));

}
$conexao->close();
?>