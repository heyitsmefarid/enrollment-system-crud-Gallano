<?php
header('Content-Type: application/json');
include '../../dbcon.php'; 

$load_id = $_POST['load_id'] ?? null;
$stud_id = $_POST['stud_id'] ?? null;
$subject_id = $_POST['subject_id'] ?? null;

if (!$load_id || !$stud_id || !$subject_id) {
    echo json_encode(["success" => false, "error" => "Missing required fields"]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE student_load SET stud_id = ?, subject_id = ? WHERE load_id = ?");
    $stmt->execute([$stud_id, $subject_id, $load_id]);

    echo json_encode(["success" => true, "message" => "Enrollment updated successfully"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
