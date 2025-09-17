<?php
require_once "../../dbcon.php";

try {
    $stmt = $pdo->prepare("SELECT year_id, year_from, year_to FROM year_tbl");
    $stmt->execute();
    $years = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "data" => $years]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>