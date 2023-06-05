<?php
    //ERRORS
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $host = "localhost";
    $username = "87231";
    $password = "42Batuhan630.";
    $database = "shoebox";

    $conn = mysqli_connect($host, $username, $password, $database);
    
    if(!$conn){echo 'Connection error: ' . mysqli_connect_error();}
    if (isset($_GET['product_type'])){
        $product_type = $_GET['product_type'];
        $sql = "SELECT * FROM `tabel_schoenen` WHERE product_type = '$product_type'";
    }else{
        $sql = "SELECT * FROM `tabel_schoenen`";
    }
    
    
    
    
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);

    // while ($row = mysqli_fetch_all($result, MYSQLI_ASSOC)) {
    //     $jsonArray[] = $row;
    // }
    mysqli_free_result($result);
    mysqli_close($conn);
    // Encodeer de Array en maak er een JSON encoded string van
    $json = json_encode($row);
    
    // Toon de JSON string op het scherm
    echo $json;


?>