# HWUM Summer Programme 2027 — Website

K17SW Web Development and Databases — Summer Assignment.
A promotional website for the Heriot-Watt University Malaysia Summer Programme for ESIEA students, with an online registration form backed by a **MySQL database** queried through **PHP (PDO + prepared statements)**.

## Project structure

```
web-main/
├── index.html          Single-page website (7 sections + database panel)
├── database.sql        Creates the `hwum_summer` database, tables and seed data
├── css/style.css       All styling
├── js/main.js          Navigation, gallery carousel, form validation,
│                       fetch() calls to the PHP API
├── php/
│   ├── config.inc.php  Database credentials (host, name, user, password)
│   ├── db.php          Shared PDO connection helper
│   ├── registrations.php  GET  — list + SQL filtering + GROUP BY stats
│   ├── register.php       POST — INSERT with prepared statement
│   └── delete.php         POST — DELETE by primary key
└── images/             Optimised photos (web copies in images/gallery/)
```

## Database design

Two related tables (see `database.sql`):

- **courses** (`courseID` PK, `courseCode` UNIQUE, `courseName`, `sessionsPerWeek`)
- **registrations** (`regID` PK, `fullName`, `phone`, `email` UNIQUE, `courseID` **FK → courses**, `comments`, `regDate`)

The foreign key uses `ON DELETE RESTRICT ON UPDATE CASCADE`. The UNIQUE
constraint on `email` prevents duplicate registrations. Filtering by course
and searching by name/email are done **in SQL** (`WHERE`, `LIKE`,
`INNER JOIN`), and the statistics pills use `LEFT JOIN` + `GROUP BY` +
`COUNT()`. All user input goes through **prepared statements** (protection
against SQL injection) plus server-side validation.

### ER model

```
┌─────────────────────┐         ┌──────────────────────┐
│ courses             │ 1     * │ registrations        │
├─────────────────────┤◄────────├──────────────────────┤
│ courseID {PK}       │  has    │ regID {PK}           │
│ courseCode {UNIQUE} │         │ fullName             │
│ courseName          │         │ phone                │
│ sessionsPerWeek     │         │ email {UNIQUE}       │
└─────────────────────┘         │ courseID {FK}        │
                                │ comments             │
                                │ regDate              │
                                └──────────────────────┘
A course can have zero or more registrations (0..*).
Each registration belongs to exactly one course (1..1).
```

### Schema (full script in `database.sql`)

```sql
CREATE DATABASE IF NOT EXISTS hwum_summer
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hwum_summer;

CREATE TABLE courses (
  courseID        INT AUTO_INCREMENT PRIMARY KEY,
  courseCode      VARCHAR(20)  NOT NULL UNIQUE,
  courseName      VARCHAR(100) NOT NULL,
  sessionsPerWeek TINYINT      NOT NULL DEFAULT 3
);

CREATE TABLE registrations (
  regID    INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(150) NOT NULL,
  phone    VARCHAR(25)  NOT NULL,
  email    VARCHAR(100) NOT NULL UNIQUE,
  courseID INT          NOT NULL,
  comments TEXT,
  regDate  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (courseID) REFERENCES courses(courseID)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);
```

### SQL queries used by the website

| Action on the site | SQL executed (via PDO prepared statements) | File |
|---|---|---|
| Submit the registration form | `INSERT INTO registrations (fullName, phone, email, courseID, comments) VALUES (:name, :phone, :email, :courseID, :comments)` | `php/register.php` |
| Display the admin table | `SELECT r.*, c.courseCode, c.courseName FROM registrations r INNER JOIN courses c ON r.courseID = c.courseID ORDER BY r.regDate DESC` | `php/registrations.php` |
| Filter by course | `… WHERE r.courseID = :courseID` | `php/registrations.php` |
| Search by name or email | `… WHERE (r.fullName LIKE :search OR r.email LIKE :search)` | `php/registrations.php` |
| Statistics pills | `SELECT c.courseName, COUNT(r.regID) AS total FROM courses c LEFT JOIN registrations r ON r.courseID = c.courseID GROUP BY c.courseID` | `php/registrations.php` |
| Populate the course dropdowns | `SELECT courseID, courseCode, courseName FROM courses ORDER BY courseID` | `php/registrations.php` |
| Delete a row (🗑 button) | `DELETE FROM registrations WHERE regID = :id` | `php/delete.php` |

## How to run (XAMPP)

1. Install [XAMPP](https://www.apachefriends.org/) and start **Apache** and **MySQL** from the XAMPP Control Panel.
2. Copy this whole folder into `C:\xampp\htdocs\` (e.g. `C:\xampp\htdocs\hwum`).
3. Open [http://localhost/phpmyadmin](http://localhost/phpmyadmin) → **Import** tab → choose `database.sql` → **Go**.
   This creates the `hwum_summer` database with 3 courses and 5 demo registrations.
4. Open **http://localhost/hwum/index.html** in your browser.

> ⚠ The site must be opened through `http://localhost/…`, not by
> double-clicking `index.html` — the browser cannot call PHP from a
> `file://` page. If the database is unreachable, a red banner appears
> in the *Database* section explaining what to check.

If your MySQL root account has a password, edit `php/config.inc.php`.

## Features

- Responsive single-page design (hero, about, courses, testimonials, registration, gallery, contact)
- Gallery: photo **carousel** by country (Malaysia / Singapore / Thailand) with captions, filters and a full-screen lightbox — all photos taken by previous participants
- Registration form with live client-side validation **and** server-side validation
- Admin panel: live SQL filtering, search, per-course statistics, row deletion, CSV export
