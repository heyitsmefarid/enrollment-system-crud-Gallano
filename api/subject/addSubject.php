<?php
require_once "../../dbcon.php";

$subject_name = $_POST['subject_name'] ?? '';
$sem_id       = $_POST['sem_id'] ?? '';

if (!$subject_name || !$sem_id) {
    echo json_encode([
        "success" => false,
        "error" => "subject_name and sem_id are required"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO subject_tbl (subject_name, sem_id) VALUES (?, ?)");
    $stmt->execute([$subject_name, $sem_id]);

    echo json_encode([
        "success" => true,
        "message" => "Subject added successfully"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>