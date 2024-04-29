<?php

session_start();

include_once ("conexao.php");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ra = $_POST['ra'];
    $senha = $_POST['senha'];

    $sql = "SELECT login_adm.cod_adm from login_adm
    INNER join ra on login_adm.cod_ra = ra.cod_ra
    where ra.RA = '$ra' and login_adm.senha_adm = '$senha';";

    $resultado = mysqli_query($conexao, $sql);

    if (mysqli_num_rows($resultado) > 0) {

        $sim = true;
    } else {
        $sim = false;
    }

    if ($sim == true) {

        while ($row = mysqli_fetch_array($resultado)) {
            $cod = $row['cod_adm'];
            $_SESSION['id_usuario'] = $cod;

        }

    } else {
        $cod = '';
    }



    echo json_encode(array($sim, $cod));

}
$conexao->close();

?>
