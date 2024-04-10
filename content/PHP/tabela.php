<?php
include_once("conexao.php");



if($_SERVER["REQUEST_METHOD"] == "POST") {

    $sql = mysqli_query($conexao,"SELECT cod_paciente cod, nome_paciente nome FROM dados_paciente");

    $resultado = array();

    $resultado[] = '<option value="" disabled selected>Escolha uma opção</option>';

    while($row = mysqli_fetch_array($sql)) {
        $resultado[] = "<option value='" . $row['cod'] . "'>" . $row['nome']. "</option>";
    }

    

    echo json_encode($resultado, JSON_UNESCAPED_SLASHES);

}


?>