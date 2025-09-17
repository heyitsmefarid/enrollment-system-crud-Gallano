<?php
require_once "../../dbcon.php";

try {
    $stmt = $pdo->query("SELECT * FROM program_tbl");
    $programs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "data" => $programs]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>