<?php
/* ============================================================
   POST /php/register.php
   Body (JSON): { name, phone, email, courseID, comments }

   Inserts one registration using a prepared statement with
   named parameters (see Week 7 — Prepared Statements), which
   protects against SQL injection.
   ============================================================ */

require_once('db.php');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('POST request required.', 405);
}

$input    = readJsonBody();
$name     = trim($input['name']     ?? '');
$phone    = trim($input['phone']    ?? '');
$email    = trim($input['email']    ?? '');
$courseID = (int) ($input['courseID'] ?? 0);
$comments = trim($input['comments'] ?? '');

// Server-side validation (never trust client input alone)
if ($name === '' || $phone === '' || $email === '' || $courseID <= 0) {
    jsonError('Please fill in all required fields.', 400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonError('Please enter a valid email address.', 400);
}

try {
    $pdo = getConnection();

    $sql = "INSERT INTO registrations (fullName, phone, email, courseID, comments)
            VALUES (:name, :phone, :email, :courseID, :comments)";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(':name',     $name);
    $statement->bindValue(':phone',    $phone);
    $statement->bindValue(':email',    $email);
    $statement->bindValue(':courseID', $courseID, PDO::PARAM_INT);
    $statement->bindValue(':comments', $comments);
    $statement->execute();

    echo json_encode(['success' => true, 'regID' => (int) $pdo->lastInsertId()]);

    $pdo = null;
}
catch (PDOException $e) {
    // 23000 = integrity constraint violation:
    // either the UNIQUE email or the courseID foreign key
    if ($e->getCode() == 23000) {
        jsonError('This email address is already registered.', 409);
    }
    jsonError('Database error: ' . $e->getMessage());
}
?>
