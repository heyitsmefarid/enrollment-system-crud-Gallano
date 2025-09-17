<?php
require_once "../../dbcon.php";

$program_id = $_POST['program_id'] ?? '';
$program_name = $_POST['program_name'] ?? '';
$ins_id = $_POST['ins_id'] ?? '';

if (!$program_id || !$program_name || !$ins_id) {
    echo json_encode(["success" => false, "error" => "All fields are required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE program_tbl SET program_name = ?, ins_id = ? WHERE program_id = ?");
    $stmt->execute([$program_name, $ins_id, $program_id]);
    echo json_encode(["success" => true, "message" => "Program updated successfully"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>