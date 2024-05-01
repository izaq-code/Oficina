<?php
    session_start();
    include_once ("conexao.php");

    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        
        $email = $_POST['email'];
        $senha = $_POST['senha'];
    
        if (filter_var($email, FILTER_VALIDATE_EMAIL)){

        $sql = "SELECT cod_seguradora, isOf FROM login_seguradora 
        WHERE email = '$email' AND senha = '$senha'";
        $result = $conexao->query($sql);

        if ($result->num_rows > 0) {

            echo json_encode('a');
            while ($row = mysqli_fetch_array($result)) {
                $cod = $row['cod_seguradora'];
                $isOf = $row['isOf'];
            }
            $_SESSION['id_usuario'] = $cod;
            $_SESSION['isOf'] = $isOf;

        } else {

            echo json_encode(false);
        }
        } else{

        $adm = "SELECT login_adm.cod_adm, login_adm.isOf from login_adm
        INNER join ra on login_adm.cod_ra = ra.cod_ra
        where ra.RA = '$email' and login_adm.senha_adm = '$senha';";

        $resultado = mysqli_query($conexao, $adm);

        if (mysqli_num_rows($resultado) > 0) {

            $sim = true;
        } else {
            $sim = false;
        }

        if ($sim == true) {

            while ($row = mysqli_fetch_array($resultado)) {
                $cod = $row['cod_adm'];
                $isOf = $row['isOf'];
                $_SESSION['id_usuario'] = $cod;
                $_SESSION['isOf'] = $isOf;
            }
        } else {
            $cod = '';
        }
        echo json_encode(array($sim, $cod));

    }
    }
    
    ?>
