<?php
require_once "../../dbcon.php";

$program_name = $_POST['program_name'] ?? '';
$ins_id = $_POST['ins_id'] ?? '';

if (!$program_name || !$ins_id) {
    echo json_encode(["success" => false, "error" => "All fields are required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO program_tbl (program_name, ins_id) VALUES (?, ?)");
    $stmt->execute([$program_name, $ins_id]);
    echo json_encode(["success" => true, "message" => "Program added successfully"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>