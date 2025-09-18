<?php
require_once "../../dbcon.php";

try {
 
    $stmt = $pdo->query("SELECT stud_id, lname, fname, middle, program_id, allowance FROM student_tbl ORDER BY stud_id ASC");
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "data" => $students
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>
