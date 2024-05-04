<?php
include_once('conexao.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $diretorio = '../upload/';
    $status = $_POST['cod'];
    $nomeArquivos = array();
    $caminhosArquivos = array();

    $busca = "SELECT chassi, hodometro, Frente, Trasseira, lateral_direita, Lateral_esquerda, Motor, Pecas_danificadas, orcamento
                             FROM carro_fotos WHERE cod_veiculo = '$status'";
    $resultado = mysqli_query($conexao, $busca);
    
    while ($row = mysqli_fetch_assoc($resultado)) {
        foreach ($row as $key => $value) {
            if (!empty($value)) {
                $caminhoCompleto = $diretorio . basename($value);
                if (file_exists($caminhoCompleto)) {
                    unlink($caminhoCompleto); 
                }
            }
        }
    }

    $Delete = "DELETE FROM carro_fotos WHERE cod_veiculo = '$status'";
    $atualizado = mysqli_query($conexao, $Delete);

    if (!$atualizado) {
        echo "Erro ao excluir imagens antigas: " . mysqli_error($conexao);
        exit;
    }

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
    $sql = "INSERT INTO carro_fotos (chassi, hodometro, Frente, Trasseira, lateral_direita, Lateral_esquerda, Motor, Pecas_danificadas, orcamento, cod_veiculo) VALUES 
    ('$caminhosArquivos[0]', '$caminhosArquivos[1]', '$caminhosArquivos[2]', '$caminhosArquivos[3]', '$caminhosArquivos[4]', '$caminhosArquivos[5]', 
    '$caminhosArquivos[6]', '$caminhosArquivos[7]', '$caminhoArquivoPDF', '$status')";

    $tiago = "UPDATE carro SET status_veiculo = 'Finalizado' 
    WHERE cod_veiculo = '$status'";

    $tito = mysqli_query($conexao, $tiago);
    
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
