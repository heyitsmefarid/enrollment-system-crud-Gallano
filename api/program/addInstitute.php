<?php
header('Content-Type: application/json');
require '../../dbcon.php';

$ins_name = $_POST['ins_name'] ?? '';

if (!$ins_name) {
    echo json_encode(["success" => false, "error" => "Institute name is required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO institute_tbl (ins_name) VALUES (?)");
    $stmt->execute([$ins_name]);
    echo json_encode(["success" => true, "message" => "Institute added successfully"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
