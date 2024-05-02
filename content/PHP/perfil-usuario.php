<?php

session_start();
include_once ('conexao.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $caminhoArquivoPDF;
    $cod = $_SESSION['id_usuario'];
    $isOf = $_SESSION['isOf'];

    if (isset($_FILES['foto__input9'])) {

        $diretorio = '../fotos-usuarios/';
        $pdfNomeArquivo = $diretorio . basename($_FILES['foto__input9']['name']);

        if (move_uploaded_file($_FILES['foto__input9']['tmp_name'], $pdfNomeArquivo)) {
            $caminhoArquivoPDF = mysqli_real_escape_string($conexao, $pdfNomeArquivo);
        }
    }

    $nome = $_POST['nome'];
    $email = $_POST['email'];

    $sql = "UPDATE login_seguradora
        SET nome = '$nome',
            email = '$email',
            foto = '$caminhoArquivoPDF'
        WHERE cod_seguradora = '$cod';
    ";

    if ($conexao->query($sql) === TRUE) {
        echo "Inserção realizada com sucesso";
    } else {
        echo "Erro na inserção: " . $conexao->error;
    }




}
$conexao->close();
?>