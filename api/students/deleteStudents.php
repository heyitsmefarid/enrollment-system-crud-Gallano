<?php
header('Content-Type: application/json');

require_once "../../dbcon.php"; // check this path carefully!!!

$stud_id = $_POST['stud_id'] ?? '';

if (!$stud_id) {
    echo json_encode(["success" => false, "error" => "Student ID is required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM student_tbl WHERE stud_id = ?");
    $stmt->execute([$stud_id]);
    echo json_encode(["success" => true, "message" => "Student deleted successfully"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
