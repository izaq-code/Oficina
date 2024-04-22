<?php
  include_once("conexao.php");

  if ($_SERVER["REQUEST_METHOD"] == "POST") {

   $nome = $_POST['nome'];
   $cnpj = $_POST['cnpj']; 
   $senha = $_POST['senha']; 

 $sql = "INSERT INTO login_seguradora (nome, cnpj, senha) VALUES 
 ('$nome', '$cnpj', '$senha')";

if ($conexao->query($sql) === TRUE) {
    echo "Inserção realizada com sucesso";
} else {
    echo "Erro na inserção: " . $conexao->error;
}
}
?>