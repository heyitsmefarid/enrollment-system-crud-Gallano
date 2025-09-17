<?php
require_once "../../dbcon.php";

$sem_id = $_POST['sem_id'] ?? '';

if (!$sem_id) {
    echo json_encode([
        "success" => false,
        "error" => "sem_id is required"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM semester_tbl WHERE sem_id = ?");
    $stmt->execute([$sem_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Semester deleted successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "error" => "No record found with the provided sem_id"
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>