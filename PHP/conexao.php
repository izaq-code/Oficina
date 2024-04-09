<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "oficina";

$conexao = new mysqli($servername, $username, $password, $dbname);

if ($conexao->connect_error){
    die("conexão falhou : " . $conexao->connect_error);
}

?>