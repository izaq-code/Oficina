<?php

session_start();
include_once ("conexao.php");


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $cod = $_SESSION['id_usuario'];

    $slq = mysqli_query($conexao, "SELECT ra.nome_funcionario nome_fulano, ra.ra email_fulano from login_adm
    INNER join ra on login_adm.cod_ra = ra.cod_ra WHERE login_adm.cod_adm = '$cod'");


    while($row = mysqli_fetch_array($slq)){

        $sim = $row;

    }

    echo json_encode($sim);

}

$conexao->close();
?>