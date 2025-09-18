<?php
header('Content-Type: application/json');
require_once("../../dbcon.php");

$load_id = $_POST['load_id'] ?? null;

if (!$load_id) {
    echo json_encode(["success" => false, "error" => "Missing load_id"]);
    exit;
}

try {
    $sql = "DELETE FROM student_load WHERE load_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$load_id]);
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
