<?php
    //ERRORS
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    //FTP HOST SETTINGS
    $ftp_server = "";
    $ftp_user_name = "";
    $ftp_user_pass = "";

    //DB CONNECTIONS
    $conn = mysqli_connect('localhost', '', '', '');
    if(!$conn){echo 'Connection error: ' . mysqli_connect_error();}
    
    if (isset($_POST['submit'])){
        // TO DATABASE
        $naam = $_POST['naam'];
        $type = $_POST['type'];
        $beschrijving = $_POST['beschrijving'];
        $prijs = $_POST['prijs'];
        $merk = $_POST['merk'];
        $min_maat = $_POST['min-maat'];
        $max_maat = $_POST['max-maat'];

        //BESTANDEN ZELF
        $bestand1 = $_FILES['bestand1'];
        $bestand2 = $_FILES['bestand2'];
        $bestand3 = $_FILES['bestand3'];
        $bestand4 = $_FILES['bestand4'];

        // GROOTTE BESTANDEN
        $fileSize1 = intval($bestand1['size']);
        $fileSize2 = intval($bestand2['size']);
        $fileSize3 = intval($bestand3['size']);
        $fileSize4 = intval($bestand4['size']);

        // NAAM VAN HET BESTAND
        $fileName1 = $_FILES['bestand1']['name'];
        $fileName2 = $_FILES['bestand2']['name'];
        $fileName3 = $_FILES['bestand3']['name'];
        $fileName4 = $_FILES['bestand4']['name'];

        // TIJDELIJKE NAAM VAN HET BESTAND
        $fileTmpName1 = $_FILES['bestand1']['tmp_name'];
        $fileTmpName2 = $_FILES['bestand2']['tmp_name'];
        $fileTmpName3 = $_FILES['bestand3']['tmp_name'];
        $fileTmpName4 = $_FILES['bestand4']['tmp_name'];
            
        //ERROR MELDING
        $fileError1 = $_FILES['bestand1']['error'];
        $fileError2 = $_FILES['bestand2']['error'];
        $fileError3 = $_FILES['bestand3']['error'];
        $fileError4 = $_FILES['bestand4']['error'];

        //CHECK PNG
        $fileExt1 = explode('.', $fileName1);
        $fileExt2 = explode('.', $fileName2);
        $fileExt3 = explode('.', $fileName3);
        $fileExt4 = explode('.', $fileName4);

        //get .png
        $fileActualExt1 = strtolower(end($fileExt1));
        $fileActualExt2 = strtolower(end($fileExt2));
        $fileActualExt3 = strtolower(end($fileExt3));
        $fileActualExt4 = strtolower(end($fileExt4));

        //allow file
        $allowed = Array("jpg", "jpeg", "png", "gif");


        if (in_array($fileActualExt1, $allowed) && in_array($fileActualExt2, $allowed) && in_array($fileActualExt3, $allowed) && in_array($fileActualExt4, $allowed)){
            if($fileError1 === 0 && $fileError2 === 0 && $fileError3 === 0 && $fileError4 === 0){
                if($fileSize1 < 524288 && $fileSize2 < 524288 && $fileSize3 < 524288 && $fileSize4 < 524288){
                    //PRODUCT DATA INZETTEN
                    $sql = "INSERT INTO `tabel_schoenen`(`product_id`, `product_naam`, `product_type`, `product_beschrijving`, `product_prijs`, `product_merk`, `product_min_maat`, `product_max_maat`) VALUES (NULL,'$naam','$type','$beschrijving','$prijs','$merk','$min_maat','$max_maat')";
                    $result = mysqli_query($conn, $sql);

                    //LAATSTE ID OPVRAGEN
                    $sqlGetLastID = "SELECT MAX(`product_id`) AS max_id FROM `tabel_schoenen`";
                    $result2 = mysqli_query($conn, $sqlGetLastID);
                    $mapID = 0;
                    while($maxID = mysqli_fetch_assoc($result2)){
                        $mapID = $maxID['max_id'];
                    }
                        
                    //ftp connectie maken
                    $ftp = ftp_connect($ftp_server);
                    $login_result = ftp_login($ftp, $ftp_user_name, $ftp_user_pass);

                    //map aanmaaken
                    if (ftp_mkdir($ftp, $mapID)) {
                        //echo "successfully created $mapID\n";
                    } else {
                        //echo "There was a problem while creating $mapID\n";
                        $sql = "DELETE FROM `tabel_schoenen` WHERE `product_id` = '$mapID'";
                        $result = mysqli_query($conn, $sql);
                    }

                    //rechten geven aan map
                    if (ftp_chmod($ftp, 0755, $mapID) !== false) {
                        //echo "$mapID chmoded successfully to 644\n";

                        //bestands naam wijzigen en verplaatsen naar zijn map
                        $naampje1 = "img (1)";
                        $bestandsnaam1 = $naampje1 . "." . $fileActualExt1;
                        $map1 = "../../../../../imgs/$mapID";
                        move_uploaded_file($fileTmpName1, $map1."/".$bestandsnaam1);

                        $naampje2 = "img (2)";
                        $bestandsnaam2 = $naampje2 . "." . $fileActualExt2;
                        $map2 = "../../../../../imgs/$mapID";
                        move_uploaded_file($fileTmpName2, $map2."/".$bestandsnaam2);

                        $naampje3 = "img (3)";
                        $bestandsnaam3 = $naampje3 . "." . $fileActualExt3;
                        $map3 = "../../../../../imgs/$mapID";
                        move_uploaded_file($fileTmpName3, $map3."/".$bestandsnaam3);

                        $naampje4 = "img (4)";
                        $bestandsnaam4 = $naampje4 . "." . $fileActualExt4;
                        $map4 = "../../../../../imgs/$mapID";
                        move_uploaded_file($fileTmpName4, $map4."/".$bestandsnaam4);

                        header("Location: ../addProductForm.html");
                        exit();
                    } 
                    else {
                        //echo "could not chmod $mapID\n";
                        $sql = "DELETE FROM `tabel_schoenen` WHERE `product_id` = '$mapID'";
                        $result = mysqli_query($conn, $sql);
                    }

                    //connecties sluiten
                    ftp_close($ftp);
                    mysqli_close($conn);
                }
                else{
                    echo "Grootte";
                }
            }else{
                echo "error";
            }
        }
        else{
            echo "type";
        }
    }
?>