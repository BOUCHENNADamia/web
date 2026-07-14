<?php
/* ============================================================
   Shared database helper (see Week 7 — Working with SQL in PHP)
   1. Connect to the database (PDO)
   2. Handle connection errors (try/catch in each endpoint)
   3. Execute the SQL query
   4. Process the results (returned to the front end as JSON)
   5. Free resources and close connection
   ============================================================ */

require_once('config.inc.php');

header('Content-Type: application/json; charset=utf-8');

function getConnection() {
    $pdo = new PDO(DBCONNSTRING, DBUSER, DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
}

function jsonError($message, $status = 500) {
    http_response_code($status);
    echo json_encode(['success' => false, 'error' => $message]);
    exit;
}

/* Read the JSON body of a POST request into an associative array */
function readJsonBody() {
    $body = json_decode(file_get_contents('php://input'), true);
    return is_array($body) ? $body : $_POST;
}
?>
