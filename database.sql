-- HWUM Summer Programme 2027 — database creation script
-- Import once in phpMyAdmin (Import tab)

CREATE DATABASE IF NOT EXISTS hwum_summer
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE hwum_summer;

-- courses
CREATE TABLE IF NOT EXISTS courses (
  courseID        INT AUTO_INCREMENT PRIMARY KEY,
  courseCode      VARCHAR(20)  NOT NULL UNIQUE,
  courseName      VARCHAR(100) NOT NULL,
  sessionsPerWeek TINYINT      NOT NULL DEFAULT 3
);

-- registrations
CREATE TABLE IF NOT EXISTS registrations (
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

-- Seed data: courses
INSERT INTO courses (courseCode, courseName, sessionsPerWeek) VALUES
  ('K17SW',    'Web Development and Databases', 3),
  ('K17PL-SS', 'Python for Machine Learning',   3),
  ('MALAY-SS', 'Malay Communication Skills',    1);

-- Seed data: registrations
INSERT INTO registrations (fullName, phone, email, courseID, comments) VALUES
  ('Sophie Martin',  '+33 6 12 34 56 78', 's.martin@esiea.fr',  1, 'Very excited for this programme!'),
  ('Lucas Bernard',  '+33 7 98 76 54 32', 'l.bernard@esiea.fr', 2, 'Looking forward to the ML projects.'),
  ('Amina Benali',   '+33 6 55 44 33 22', 'a.benali@esiea.fr',  3, 'Want to learn Bahasa Malaysia.'),
  ('Jules Dupont',   '+33 6 11 22 33 44', 'j.dupont@esiea.fr',  1, ''),
  ('Yasmine Oukili', '+33 7 66 77 88 99', 'y.oukili@esiea.fr',  2, 'Interested in neural networks.');
