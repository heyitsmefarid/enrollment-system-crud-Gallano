<?php
require_once "../../dbcon.php";

$sem_id   = $_POST['sem_id'] ?? '';
$sem_name = $_POST['sem_name'] ?? '';
$year_id  = $_POST['year_id'] ?? '';

if (!$sem_id || !$sem_name || !$year_id) {
    echo json_encode([
        "success" => false,
        "error" => "sem_id, sem_name, and year_id are required"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE semester_tbl SET sem_name = ?, year_id = ? WHERE sem_id = ?");
    $stmt->execute([$sem_name, $year_id, $sem_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Semester updated successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "error" => "No record found with the provided sem_id or no changes made"
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>