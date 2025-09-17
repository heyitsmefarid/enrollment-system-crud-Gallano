<?php
require_once "../../dbcon.php";

$subject_id = $_POST['subject_id'] ?? '';

if (!$subject_id) {
    echo json_encode([
        "success" => false,
        "error" => "subject_id is required"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM subject_tbl WHERE subject_id = ?");
    $stmt->execute([$subject_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Subject deleted successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "error" => "No record found with the provided subject_id"
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>