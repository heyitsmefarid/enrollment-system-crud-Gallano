<?php
header('Content-Type: application/json');
require_once("../../dbcon.php");

try {
    $stmt = $pdo->prepare("
        SELECT 
            sl.load_id,
            sl.stud_id,
            CONCAT(st.lname, ', ', st.fname, ' ', st.middle, ' .') AS student_name,
            sub.subject_id,
            sub.subject_name,
            sem.sem_name AS semester_name,
            p.program_name
        FROM student_load sl
        INNER JOIN student_tbl st ON sl.stud_id = st.stud_id
        INNER JOIN subject_tbl sub ON sl.subject_id = sub.subject_id
        INNER JOIN semester_tbl sem ON sub.sem_id = sem.sem_id
        LEFT JOIN program_tbl p ON st.program_id = p.program_id
    ");
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'data' => $data]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
