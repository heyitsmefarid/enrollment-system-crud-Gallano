<?php
require_once "../../dbcon.php";

$program_id = $_POST['program_id'] ?? '';

if (!$program_id) {
    echo json_encode(["success" => false, "error" => "Program ID is required"]);
    exit;
}

try {
    $stmtCheck = $pdo->prepare("SELECT COUNT(*) FROM student_tbl WHERE program_id = ?");
    $stmtCheck->execute([$program_id]);
    if ($stmtCheck->fetchColumn() > 0) {
        echo json_encode(["success" => false, "error" => "Cannot delete: students are enrolled"]);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM program_tbl WHERE program_id = ?");
    $stmt->execute([$program_id]);
    echo json_encode(["success" => true, "message" => "Program deleted successfully"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>