<?php
session_start();
include_once ("conexao.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $cod = $_SESSION['id_usuario'];
    $isOf = $_SESSION['isOf'];

    if(!$isOf){
    $sql = mysqli_query($conexao, "SELECT 
                                    nome, email, foto 
                                    FROM login_seguradora
                                    WHERE cod_seguradora = '$cod'");

    $resultado;
    $isOf = false;

    while ($row = mysqli_fetch_array($sql)) {
        $resultado = $row; 
    }
    $sim = array(
        'resultado' => $resultado,
        'isOf' => $isOf
    );
    echo json_encode($sim, JSON_UNESCAPED_SLASHES);
    exit();
}

$sql = mysqli_query($conexao, "SELECT 
                                ra.nome_funcionario nome_fulano, 
                                ra.ra email_fulano,
                                Login_adm.foto foto_perfil  
                                from login_adm
                                INNER join ra on 
                                login_adm.cod_ra = ra.cod_ra 
                                WHERE login_adm.cod_adm = '$cod'");

    $resultado;
    $isOf = true;

    while ($row = mysqli_fetch_array($sql)) {
        $resultado = $row; 
    }

    $sim = array(
        'resultado' => $resultado,
        'isOf' => $isOf
    );




    echo json_encode($sim, JSON_UNESCAPED_SLASHES);

}


?>
