<?php
include_once('conexao.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $diretorio = '../upload/';
    $nomeArquivo1 = $diretorio . basename($_FILES['foto__input1']['name']);
    $nomeArquivo2 = $diretorio . basename($_FILES['foto__input2']['name']);
    $nomeArquivo3 = $diretorio . basename($_FILES['foto__input3']['name']);
    $nomeArquivo4 = $diretorio . basename($_FILES['foto__input4']['name']);
    $nomeArquivo5 = $diretorio . basename($_FILES['foto__input5']['name']);
    $nomeArquivo6 = $diretorio . basename($_FILES['foto__input6']['name']);
    $nomeArquivo7 = $diretorio . basename($_FILES['foto__input7']['name']);
    $nomeArquivo8 = $diretorio . basename($_FILES['foto__input8']['name']);

    if (move_uploaded_file($_FILES['foto__input1']['tmp_name'], $nomeArquivo1)) {

        $caminhoArquivo1 = mysqli_real_escape_string($conexao, $nomeArquivo1);
    }

    if (move_uploaded_file($_FILES['foto__input2']['tmp_name'], $nomeArquivo2)) {

        $caminhoArquivo2 = mysqli_real_escape_string($conexao, $nomeArquivo2);
    }

    if (move_uploaded_file($_FILES['foto__input3']['tmp_name'], $nomeArquivo3)) {

        $caminhoArquivo3 = mysqli_real_escape_string($conexao, $nomeArquivo3);
    } 

    if (move_uploaded_file($_FILES['foto__input4']['tmp_name'], $nomeArquivo4)) {

        $caminhoArquivo4 = mysqli_real_escape_string($conexao, $nomeArquivo4);
    } 

    if (move_uploaded_file($_FILES['foto__input5']['tmp_name'], $nomeArquivo5)) {

        $caminhoArquivo5 = mysqli_real_escape_string($conexao, $nomeArquivo5);
    } 

    if (move_uploaded_file($_FILES['foto__input6']['tmp_name'], $nomeArquivo6)) {

        $caminhoArquivo6 = mysqli_real_escape_string($conexao, $nomeArquivo6);
    }

    if (move_uploaded_file($_FILES['foto__input7']['tmp_name'], $nomeArquivo7)) {

        $caminhoArquivo7 = mysqli_real_escape_string($conexao, $nomeArquivo7);
    }

    if (move_uploaded_file($_FILES['foto__input8']['tmp_name'], $nomeArquivo8)) {

        $caminhoArquivo8 = mysqli_real_escape_string($conexao, $nomeArquivo8);
    } else {
        echo "Erro ao enviar imagens.";
    }

        $sql = "INSERT INTO carro_fotos (chassi, hodometro, Frente, Trasseira, lateral_direita, Lateral_esquerda, Motor, Pecas_danificadas) VALUES 
        ('$caminhoArquivo1', '$caminhoArquivo2', '$caminhoArquivo3', '$caminhoArquivo4', '$caminhoArquivo5', '$caminhoArquivo6', '$caminhoArquivo7', '$caminhoArquivo8')";
        
        if ($conexao->query($sql) === TRUE) {
            echo "Imagens enviadas e salvas no banco de dados com sucesso!";
        } else {
            echo "Erro ao salvar imagens no banco de dados: " . $conexao->error;
        }

        $conexao->close();
}
?>
