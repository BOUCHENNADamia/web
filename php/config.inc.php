<?php
/* ============================================================
   Database connection details (see Week 7 — Storing Connection
   Details). Kept in one file so the credentials can be changed
   without touching any other code.
   Default values match a standard XAMPP installation.
   ============================================================ */

define('DBHOST', 'localhost');
define('DBNAME', 'hwum_summer');
define('DBUSER', 'root');
define('DBPASS', '');
define('DBCONNSTRING', "mysql:host=" . DBHOST . ";dbname=" . DBNAME . ";charset=utf8mb4");
?>
