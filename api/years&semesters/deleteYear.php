<?php
require_once "../../dbcon.php";

$year_id = $_POST['year_id'] ?? '';

if (!$year_id) {
    echo json_encode([
        "success" => false,
        "error" => "year_id is required"
    ]);
    exit;
}

try {

    $stmt = $pdo->prepare("DELETE FROM year_tbl WHERE year_id = ?");
  
    $stmt->execute([$year_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "success" => true,
            "message" => "Year deleted successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "error" => "No record found with the provided year_id"
        ]);
    }
} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>