<?php
require_once "../../dbcon.php";

$subject_id   = $_POST['subject_id'] ?? '';
$subject_name = $_POST['subject_name'] ?? '';
$sem_id       = $_POST['sem_id'] ?? '';

if (!$subject_id || !$subject_name || !$sem_id) {
    echo json_encode([
        "success" => false,
        "error" => "subject_id, subject_name, and sem_id are required"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE subject_tbl SET subject_name = ?, sem_id = ? WHERE subject_id = ?");
    $stmt->execute([$subject_name, $sem_id, $subject_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Subject updated successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "error" => "No record found with the provided subject_id or no changes made"
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>