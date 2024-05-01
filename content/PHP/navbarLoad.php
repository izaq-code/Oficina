<?php

session_start();
include_once ("conexao.php");


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $cod = $_SESSION['id_usuario'];
    $isOf = $_SESSION['isOf'];
    $query;

    if ($isOf) {

        $query = "SELECT 
                    ra.nome_funcionario nome_fulano, 
                    ra.ra email_fulano  from login_adm
                    INNER join ra on 
                    login_adm.cod_ra = ra.cod_ra 
                    WHERE login_adm.cod_adm = '$cod'";
    } else {
        $query = "SELECT 
                    nome nome_fulano, email email_fulano  
                    FROM login_seguradora 
                    WHERE cod_seguradora = '$cod'";
    }

    $sql = mysqli_query($conexao, $query);

    while ($row = mysqli_fetch_array($sql)) {

        $sim = $row;

    }

    echo json_encode($sim);

}

$conexao->close();
?>
