<?php
require_once "../../dbcon.php";

$sem_name = $_POST['sem_name'] ?? '';
$year_id  = $_POST['year_id'] ?? '';

if (!$sem_name || !$year_id) {
    echo json_encode([
        "success" => false,
        "error" => "sem_name and year_id are required"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO semester_tbl (sem_name, year_id) VALUES (?, ?)");
    $stmt->execute([$sem_name, $year_id]);

    echo json_encode([
        "success" => true,
        "message" => "Semester added successfully"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>