<?php
// index.php

// // Uključivanje skripti za obradu zahtjeva
// require_once 'api/get_data.php';
// require_once 'api/post_data.php';

// // Obrada GET zahtjeva
// if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//     // Poziv funkcije za obradu GET zahtjeva iz get_data.php
//     echo get_data();
// }

// Postavke za MySQL bazu
$servername = "localhost";
$username = "cadcamgr_aron";
$password = "Bejrut@123";
$database = "cadcamgr_demo";

// Kreiranje veze s bazom podataka
$conn = new mysqli($servername, $username, $password, $database);

// Provjera veze s bazom podataka
if ($conn->connect_error) {
    die("Greška u vezi s bazom podataka: " . $conn->connect_error);
}

// Postavljanje HTTP zaglavlja za podršku JSON formatu
header('Content-Type: application/json');

// Obrada GET zahtjeva
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Izvršavanje SELECT upita
    $sql = "SELECT * FROM `proizvodi`";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // Ispis podataka kao JSON odgovor
        header('Content-Type: application/json');
        echo json_encode($data);
    } else {
        echo "Nema rezultata.";
    }
}

// CREATE - Dodavanje novog narudzba
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Provjerite je li $data niz
    if (is_array($data)) {
        $success_messages = array();
        $error_messages = array();

        foreach ($data as $narudzba) {
            $Proizvod_ID = $narudzba['Proizvod_ID'];
            $BAR_COD = $narudzba['BAR_COD'];
            $Kolicina = $narudzba['Kolicina'];

            $sql = "INSERT INTO narudzba (Proizvod_ID, BAR_COD, Kolicina) VALUES ('$Proizvod_ID', '$BAR_COD', '$Kolicina')";

            if ($conn->query($sql) === TRUE) {
                $success_messages[] = 'Narudzba za Proizvod_ID ' . $Proizvod_ID . ' je uspješno dodana';
            } else {
                $error_messages[] = 'Pogreška prilikom dodavanja narudzbe za Proizvod_ID ' . $Proizvod_ID . ': ' . $conn->error;
            }
        }

        // Ispisujemo odgovore za svaku narudžbu
        $response = array(
            'success' => $success_messages,
            'error' => $error_messages
        );

        echo json_encode($response);
    } else {
        echo json_encode(['error' => 'Nema valjane liste narudžbi u JSON tijelu']);
    }
}

// UPDATE - Ažuriranje postojećeg proizvoda
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);

    $rb = $data['RB'];
    $naziv = $data['Naziv'];
    $sadrzaj = $data['Sadrzaj'];
    $alk = $data['Alk'];
    $pak = $data['Pak'];
    $bar_cod = $data['BAR_COD'];
    $osn_c = $data['Osn_c'];
    $tros = $data['Tros'];
    $vpc = $data['VPC'];
    $pn = $data['PN'];
    $vpc_kn = $data['VPC_kn'];
    $tip = $data['tip'];
    $pod_tip = $data['pod_tip'];
    $tip_br = $data['tip_br'];
    $drzava = $data['drzava'];

    $sql = "UPDATE proizvodi SET Naziv='$naziv', Sadrzaj='$sadrzaj', Alk='$alk', Pak='$pak', BAR_COD='$bar_cod', Osn_c='$osn_c', Tros='$tros', VPC='$vpc', PN='$pn', VPC_kn='$vpc_kn', tip='$tip', pod_tip='$pod_tip', tip_br='$tip_br', drzava='$drzava' WHERE RB='$rb'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Proizvod je uspješno ažuriran']);
    } else {
        echo json_encode(['error' => 'Pogreška prilikom ažuriranja proizvoda: ' . $conn->error]);
    }
}

// DELETE - Brisanje proizvoda
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $rb = $_GET['RB'];

    $sql = "DELETE FROM proizvodi WHERE RB='$rb'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Proizvod je uspješno obrisan']);
    } else {
        echo json_encode(['error' => 'Pogreška prilikom brisanja proizvoda: ' . $conn->error]);
    }
}

// Zatvaranje veze s bazom podataka
$conn->close();

?>
