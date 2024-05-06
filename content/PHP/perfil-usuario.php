<?php

session_start();
include_once ('conexao.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $caminhoArquivoPDF;
    $fotoAntiga;
    $semFoto = '../fotos-usuarios/semfoto.png';
    $caminhoArquivoPDF = $semFoto;
    $cod = $_SESSION['id_usuario'];
    $isOf = $_SESSION['isOf'];
    $apagou = $_POST['apagou'];
    $consulta;

    if ($isOf) {

        $consulta = mysqli_query($conexao, "SELECT foto from login_adm where cod_adm = '$cod'");

        while ($row = mysqli_fetch_array($consulta)) {
            $fotoAntiga = $row['foto'];
        }

        
    }

    if(!$isOf){
        
        $consulta = mysqli_query($conexao, "SELECT foto from login_seguradora where cod_seguradora = '$cod'");

        while ($row = mysqli_fetch_array($consulta)) {
            $fotoAntiga = $row['foto'];
        }
        
    }

    if (isset($_POST['foto'])) {
        $fotoBase64 = $_POST['foto'];
        // Extrai o tipo da imagem (jpeg, png, gif, etc.)
        $tipoImagem = explode(';', $fotoBase64)[0];
        $tipoImagem = explode('/', $tipoImagem)[1];
        // Decodifica a string base64 em dados binários
        $fotoBinary = base64_decode(str_replace('data:image/' . $tipoImagem . ';base64,', '', $fotoBase64));

        $diretorio = '../fotos-usuarios/';
        $nomeArquivo = 'foto_perfil_' . $cod . '.' . $tipoImagem;
        $caminhoArquivoPDF = $diretorio . $nomeArquivo;

        // Salva o arquivo no servidor
        file_put_contents($caminhoArquivoPDF, $fotoBinary);
    }

    if (!isset($_POST['foto'])) {
        if (!$apagou) {
            $caminhoArquivoPDF = $fotoAntiga;
        }
        if ($apagou) {
            if($caminhoArquivoPDF != $fotoAntiga){
            $caminhoArquivoPDF = $semFoto;
            } else {
            $caminhoArquivoPDF = $fotoAntiga;
            }
        }
    }
    if ($isOf == true) {

        $sql = "UPDATE login_adm
        SET foto = '$caminhoArquivoPDF'
        WHERE cod_adm = '$cod';

    ";

        if ($conexao->query($sql) === TRUE) {
            echo "Inserção realizada com sucesso";
        } else {
            echo "Erro na inserção: " . $conexao->error;
        }

        exit();
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
