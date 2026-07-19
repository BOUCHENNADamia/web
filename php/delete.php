<?php
/* POST — delete one registration by primary key */

require_once('db.php');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('POST request required.', 405);
}

$input = readJsonBody();
$id    = (int) ($input['id'] ?? 0);

if ($id <= 0) {
    jsonError('A valid registration id is required.', 400);
}

try {
    $pdo = getConnection();

    $statement = $pdo->prepare("DELETE FROM registrations WHERE regID = :id");
    $statement->bindValue(':id', $id, PDO::PARAM_INT);
    $statement->execute();

    if ($statement->rowCount() === 0) {
        jsonError('Registration not found.', 404);
    }

    echo json_encode(['success' => true]);

    $pdo = null;
}
catch (PDOException $e) {
    jsonError('Database error: ' . $e->getMessage());
}
?>
