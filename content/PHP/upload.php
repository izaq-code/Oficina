<?php
include_once('conexao.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $diretorio = '../upload/';
    
    $nomeArquivos = array();
    $caminhosArquivos = array();

    // Loop para lidar com o upload de todas as imagens
    for ($i = 1; $i <= 8; $i++) {
        $inputName = 'foto__input' . $i;
        $nomeArquivo = $diretorio . basename($_FILES[$inputName]['name']);
        
        if (move_uploaded_file($_FILES[$inputName]['tmp_name'], $nomeArquivo)) {
            $nomeArquivos[] = $nomeArquivo;
            $caminhosArquivos[] = mysqli_real_escape_string($conexao, $nomeArquivo);
        }
    }

    // Lida com o upload do arquivo PDF
    if (isset($_FILES['pdfFile'])) {
        $pdfNomeArquivo = $diretorio . basename($_FILES['pdfFile']['name']);
        
        if (move_uploaded_file($_FILES['pdfFile']['tmp_name'], $pdfNomeArquivo)) {
            $caminhoArquivoPDF = mysqli_real_escape_string($conexao, $pdfNomeArquivo);
        }
    }

    // Constrói a consulta SQL para inserir no banco de dados
    $sql = "INSERT INTO carro_fotos (chassi, hodometro, Frente, Trasseira, lateral_direita, Lateral_esquerda, Motor, Pecas_danificadas, orcamento) VALUES 
    ('$caminhosArquivos[0]', '$caminhosArquivos[1]', '$caminhosArquivos[2]', '$caminhosArquivos[3]', '$caminhosArquivos[4]', '$caminhosArquivos[5]', '$caminhosArquivos[6]', '$caminhosArquivos[7]', '$caminhoArquivoPDF')";

    // Executa a consulta SQL
    if ($conexao->query($sql) === TRUE) {
        echo "Imagens enviadas e salvas no banco de dados com sucesso!";
    } else {
        echo "Erro ao salvar imagens no banco de dados: " . $conexao->error;
    }

    // Fecha a conexão com o banco de dados
    $conexao->close();
}
?>
