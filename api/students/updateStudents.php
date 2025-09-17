<?php
require_once "../../dbcon.php";

$stud_id    = $_POST['stud_id'] ?? '';
$lname      = $_POST['lname'] ?? '';
$fname      = $_POST['fname'] ?? '';
$middle      = $_POST['middle'] ?? '';
$program_id = $_POST['program_id'] ?? '';
$allowance  = $_POST['allowance'] ?? '';

if (!$stud_id || !$lname || !$fname || !$program_id || !$allowance) {
    echo json_encode(["success" => false, "error" => "All fields are required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        UPDATE student_tbl 
        SET lname = ?, fname = ?, middle = ?, program_id = ?, allowance = ? 
        WHERE stud_id = ?
    ");
    $stmt->execute([$lname, $fname, $middle, $program_id, $allowance, $stud_id]);

    echo json_encode(["success" => true, "message" => "Student updated successfully"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
