<?php
require_once "../../dbcon.php";

try {
    $stmt = $pdo->prepare("SELECT subject_id, subject_name, sem_id FROM subject_tbl");
    $stmt->execute();
    $subjects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $subjects
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>