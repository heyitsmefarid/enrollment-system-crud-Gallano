<?php
require_once "../../dbcon.php";

// Collect POST data
$lname       = $_POST['lname'] ?? '';
$fname       = $_POST['fname'] ?? '';
$middle      = $_POST['middle'] ?? '';
$program_id  = $_POST['program_id'] ?? '';
$allowance   = $_POST['allowance'] ?? '';

// Validation
if (!$lname || !$fname || !$middle || !$program_id || !$allowance) {
    echo json_encode(["success" => false, "error" => "All fields are required"]);
    exit;
}

try {
    // Insert into DB
    $stmt = $pdo->prepare("INSERT INTO student_tbl (lname, fname, middle, program_id, allowance) 
                           VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$lname, $fname, $middle, $program_id, $allowance]);
    echo json_encode(["success" => true, "message" => "Student added successfully"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
