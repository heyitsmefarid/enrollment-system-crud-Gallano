<?php
require_once "../../dbcon.php";

$year_id   = $_POST['year_id'] ?? '';
$year_from = $_POST['year_from'] ?? '';
$year_to   = $_POST['year_to'] ?? '';

if (!$year_id || !$year_from || !$year_to) {
    echo json_encode([
        "success" => false,
        "error" => "year_id, year_from, and year_to are required"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE year_tbl SET year_from = ?, year_to = ? WHERE year_id = ?");

    $stmt->execute([$year_from, $year_to, $year_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Year updated successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "error" => "No record found with the provided year_id or no changes made"
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>