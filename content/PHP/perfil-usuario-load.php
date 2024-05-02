<?php
session_start();
include_once ("conexao.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $cod = $_SESSION['id_usuario'];

    $sql = mysqli_query($conexao, "SELECT 
                                    nome, email, foto 
                                    FROM login_seguradora
                                    WHERE cod_seguradora = '$cod'");

    $resultado;

    while ($row = mysqli_fetch_array($sql)) {
        $resultado = $row; 
    }



    echo json_encode($resultado, JSON_UNESCAPED_SLASHES);

}


?>