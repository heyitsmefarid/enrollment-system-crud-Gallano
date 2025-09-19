<?php
header('Content-Type: application/json');
require '../../dbcon.php';

try {
    $stmt = $pdo->query("SELECT * FROM institute_tbl ORDER BY ins_id ASC");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "data" => $data]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
