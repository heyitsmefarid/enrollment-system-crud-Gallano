<?php
header('Content-Type: application/json');
require '../../dbcon.php';

$ins_id = $_POST['ins_id'] ?? '';
if (!$ins_id) {
    echo json_encode(["success" => false, "error" => "Institute ID is required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM institute_tbl WHERE ins_id = ?");
    $stmt->execute([$ins_id]);
    echo json_encode(["success" => true, "message" => "Institute deleted successfully"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
