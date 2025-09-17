<?php
require_once "../../dbcon.php";

$year_from = $_POST['year_from'] ?? '';
$year_to   = $_POST['year_to'] ?? '';

if (!$year_from || !$year_to) {
    echo json_encode([
        "success" => false,
        "error" => "Both year_from and year_to are required"
    ]);
    exit;
}

try {

    $stmt = $pdo->prepare("INSERT INTO years_tbl (year_from, year_to) VALUES (?, ?)");
   
    $stmt->execute([$year_from, $year_to]);

    echo json_encode([
        "success" => true,
        "message" => "Year added successfully"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>