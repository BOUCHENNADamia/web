<?php
/* ============================================================
   GET /php/registrations.php[?course=<courseID>][&search=<text>]

   Returns, as JSON:
   - courses:       all courses (populates the <select> menus)
   - registrations: rows filtered in SQL (WHERE / LIKE) and
                    joined with courses (INNER JOIN)
   - stats:         per-course counts (LEFT JOIN + GROUP BY)
   - total:         total number of registrations
   ============================================================ */

require_once('db.php');

try {
    $pdo = getConnection();

    // Courses list
    $courses = $pdo->query(
        "SELECT courseID, courseCode, courseName, sessionsPerWeek
         FROM courses ORDER BY courseID"
    )->fetchAll();

    // Registrations, filtered in SQL with prepared parameters
    $sql = "SELECT r.regID, r.fullName, r.phone, r.email, r.comments, r.regDate,
                   c.courseID, c.courseCode, c.courseName
            FROM registrations r
            INNER JOIN courses c ON r.courseID = c.courseID";
    $conditions = [];
    $params     = [];

    if (isset($_GET['course']) && $_GET['course'] !== '' && $_GET['course'] !== 'all') {
        $conditions[]        = "r.courseID = :courseID";
        $params[':courseID'] = (int) $_GET['course'];
    }
    if (isset($_GET['search']) && trim($_GET['search']) !== '') {
        $conditions[]      = "(r.fullName LIKE :search OR r.email LIKE :search)";
        $params[':search'] = '%' . trim($_GET['search']) . '%';
    }
    if (count($conditions) > 0) {
        $sql .= " WHERE " . implode(" AND ", $conditions);
    }
    $sql .= " ORDER BY r.regDate DESC, r.regID DESC";

    $statement = $pdo->prepare($sql);
    $statement->execute($params);
    $registrations = $statement->fetchAll();

    // Per-course statistics computed by the database (GROUP BY)
    $stats = $pdo->query(
        "SELECT c.courseID, c.courseCode, c.courseName, COUNT(r.regID) AS total
         FROM courses c
         LEFT JOIN registrations r ON r.courseID = c.courseID
         GROUP BY c.courseID, c.courseCode, c.courseName
         ORDER BY c.courseID"
    )->fetchAll();

    $total = (int) $pdo->query("SELECT COUNT(*) AS n FROM registrations")->fetch()['n'];

    echo json_encode([
        'success'       => true,
        'courses'       => $courses,
        'registrations' => $registrations,
        'stats'         => $stats,
        'total'         => $total
    ]);

    $pdo = null; // free resources and close connection
}
catch (PDOException $e) {
    jsonError('Database error: ' . $e->getMessage());
}
?>
