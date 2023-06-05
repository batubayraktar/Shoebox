<?php
    //ERRORS
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $ftp_server = "";
    $ftp_user_name = "";
    $ftp_user_pass = "";

    $conn = mysqli_connect('localhost', '', '', '');
    
    if(!$conn){echo 'Connection error: ' . mysqli_connect_error();}
    
    if (isset($_GET['id'])){
        $id = $_GET['id'];

        $sql = "DELETE FROM `tabel_schoenen` WHERE `product_id` = '$id'";

        //ftp connectie maken
        $ftp = ftp_connect($ftp_server);
        $login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);

        // try to delete the directory $dir WERKT NIET!!

        ///aaaaaaaaaaaaaaaaaaaaaaaaaaa!

        ////////////
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_all($result, MYSQLI_ASSOC);

        mysqli_free_result($result);
        mysqli_close($conn);
        ftp_close($ftp);


    }
    header("Location: ../addProductForm.html");
    exit();    
    
    // // Encodeer de Array en maak er een JSON encoded string van
    // $json = json_encode($row);
    
    // // Toon de JSON string op het scherm
    // echo $json;
?>