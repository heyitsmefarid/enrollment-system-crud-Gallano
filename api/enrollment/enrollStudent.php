<?php
header('Content-Type: application/json');
require_once "../../dbcon.php";

$stud_id = $_POST['stud_id'] ?? '';
$subject_id = $_POST['subject_id'] ?? '';

if (empty($stud_id) || empty($subject_id)) {
    echo json_encode(["success" => false, "error" => "Missing fields"]);
    exit;
}

try {
    $sql = "INSERT INTO student_load (stud_id, subject_id) VALUES (:stud_id, :subject_id)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':stud_id', $stud_id);
    $stmt->bindParam(':subject_id', $subject_id);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Enrollment added successfully"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
