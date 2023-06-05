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
        $type = $_GET['type'];
        $beschrijving = $_GET['beschrijving'];
        $prijs = $_GET['prijs'];
        $merk = $_GET['merk'];
        $min_maat = $_GET['min-maat'];
        $max_maat = $_GET['max-maat'];

        $sql = "UPDATE `tabel_schoenen` SET `product_naam`='$naam',`product_type`='$type',`product_beschrijving`='$beschrijving',`product_prijs`='$prijs',`product_merk`='$merk',`product_min_maat`='$min_maat',`product_max_maat`='$max_maat' WHERE `product_id` = $id";
    }
    
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);

    mysqli_free_result($result);
    mysqli_close($conn);
    // // Encodeer de Array en maak er een JSON encoded string van
    // $json = json_encode($row);
    
    // // Toon de JSON string op het scherm
    // echo $json;
    header("Location: ../addProductForm.html");
    exit();
?>