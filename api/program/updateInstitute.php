<?php
header('Content-Type: application/json');
require '../../dbcon.php';

$ins_id = $_POST['ins_id'] ?? '';
$ins_name = $_POST['ins_name'] ?? '';

if (!$ins_id || !$ins_name) {
    echo json_encode(["success" => false, "error" => "All fields are required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE institute_tbl SET ins_name = ? WHERE ins_id = ?");
    $stmt->execute([$ins_name, $ins_id]);
    echo json_encode(["success" => true, "message" => "Institute updated successfully"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
