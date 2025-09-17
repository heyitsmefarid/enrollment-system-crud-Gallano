<?php
require_once "../../dbcon.php";

try {
    $stmt = $pdo->prepare("SELECT sem_id, sem_name, year_id FROM semester_tbl");
    $stmt->execute();
    $semesters = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $semesters
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>