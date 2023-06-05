<?php
    //ERRORS
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    $conn = mysqli_connect('localhost', '', '', '');
    
    if(!$conn){echo 'Connection error: ' . mysqli_connect_error();}
    
    if (isset($_GET['id'])){
        $id = $_GET['id'];
        $naam = $_GET['naam'];
        $email = $_GET['email'];
        $tel = $_GET['tel'];
        $bezAdres = $_GET['bezAdres'];
        $postcode = $_GET['postcode'];
        $stad = $_GET['stad'];
        $provincie = $_GET['provincie'];
        $status = $_GET['status'];


        $sql = "DELETE FROM `tabel_bestelling_test` WHERE `order_id` = '$id'";
    }
    
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);

    mysqli_free_result($result);
    mysqli_close($conn);
    // // Encodeer de Array en maak er een JSON encoded string van
    // $json = json_encode($row);
    
    // // Toon de JSON string op het scherm
    // echo $json;
?>