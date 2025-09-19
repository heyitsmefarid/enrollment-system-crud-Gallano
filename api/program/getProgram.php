<?php
require '../../dbcon.php';

try {
    $stmt = $pdo->query("
        SELECT p.program_id, p.program_name, p.ins_id, 
               i.ins_name
        FROM program_tbl p
        LEFT JOIN institute_tbl i ON p.ins_id = i.ins_id
        ORDER BY p.program_id ASC
    ");

    $programs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $programs
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>
