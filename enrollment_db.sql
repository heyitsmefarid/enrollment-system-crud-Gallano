-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 19, 2025 at 12:00 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `enrollment_db`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `dropStudent` (IN `s_stud_id` INT)   BEGIN
DELETE FROM student_load
WHERE subject_id = s_stud_id;

DELETE FROM subject_tbl
WHERE subject_id = s_stud_id;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getFullStudentsDetails` (IN `p_stud_id` INT)   BEGIN
SELECT s.stud_id, s.name, p.program_name, i.ins_name
from student_tbl s
join program_tbl p on s.program_id = p.program_id
join institute_tbl i ON p.ins_id= i.ins_id
where s.stud_id = p_stud_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getStudentDetails` (IN `studId` INT)   BEGIN
    SELECT  s.stud_id, s.name, p.program_name, i.ins_name
    FROM student_tbl s
    JOIN program_tbl p ON s.program_id = p.program_id
    JOIN institute_tbl i ON p.ins_id = i.ins_id
    WHERE s.stud_id = studId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetStudentSubject` (IN `in_student_id` INT)   BEGIN
    SELECT subject_name, sem_name, year_from, year_to
    FROM student_tbl s
    JOIN student_load sl ON s.stud_id = sl.stud_id
    JOIN subject_tbl sub ON sl.subject_id = sub.subject_id
    JOIN semester_tbl sem ON sub.sem_id = sem.sem_id
    JOIN year_tbl y ON sem.year_id = y.year_id
    WHERE s.stud_id = stud_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSubjects` (IN `StudentID` INT)   BEGIN
    SELECT s.stud_id, s.name AS student_name, subj.subject_id, subj.subject_name, sem.sem_name, y.year_from, y.year_to
    FROM student_tbl s
    JOIN student_load sl ON s.stud_id = sl.stud_id
    JOIN subject_tbl subj ON sl.subject_id = subj.subject_id
    JOIN semester_tbl sem ON subj.sem_id = sem.sem_id
    JOIN year_tbl y ON sem.year_id = y.year_id
    WHERE s.stud_id = StudentID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `newRecord` (IN `sId` INT, IN `Sname` VARCHAR(100), IN `prog_id` INT, IN `allow` INT)   BEGIN
   INSERT INTO student_tbl(stud_id, name, program_id, allowance)
   values(sId, Sname, prog_id, allow);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateRecord` (IN `sId` INT, IN `Sname` VARCHAR(100), IN `prog_id` INT, IN `allow` INT)   BEGIN
    UPDATE student_tbl
    SET
        stud_id = sId,
        name = Sname,
        program_id = prog_id,
        allowance = allow
    WHERE stud_id = sId;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `institute_tbl`
--

CREATE TABLE `institute_tbl` (
  `ins_id` int NOT NULL,
  `ins_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `institute_tbl`
--

INSERT INTO `institute_tbl` (`ins_id`, `ins_name`) VALUES
(1, 'College of Engineering'),
(2, 'College of Information Technology'),
(3, 'College of Business'),
(4, 'College of Education'),
(5, 'College of Arts and Sciences'),
(7, 'College of Medicine');

-- --------------------------------------------------------

--
-- Table structure for table `program_tbl`
--

CREATE TABLE `program_tbl` (
  `program_id` int NOT NULL,
  `program_name` varchar(100) DEFAULT NULL,
  `ins_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `program_tbl`
--

INSERT INTO `program_tbl` (`program_id`, `program_name`, `ins_id`) VALUES
(1, 'BS Civil Engineering', 1),
(2, 'BS Computer Science', 2),
(3, 'BS Information Systems', 2),
(4, 'BS Accountancy', 3),
(5, 'BSED MAJOR IN SCIENCE', 5),
(7, 'BSED MAJOR IN ENGLISH', 5),
(12, 'BS HOSPITALITY MANAGEMENT', 3);

-- --------------------------------------------------------

--
-- Table structure for table `semester_tbl`
--

CREATE TABLE `semester_tbl` (
  `sem_id` int NOT NULL,
  `sem_name` varchar(50) DEFAULT NULL,
  `year_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `semester_tbl`
--

INSERT INTO `semester_tbl` (`sem_id`, `sem_name`, `year_id`) VALUES
(1, '1st Semester', 1),
(2, '2nd Semester', 1),
(3, '1st Semester', 2),
(4, '2nd Semester', 2),
(5, 'Summer', 2),
(6, 'Winter', 4);

-- --------------------------------------------------------

--
-- Table structure for table `student_load`
--

CREATE TABLE `student_load` (
  `load_id` int NOT NULL,
  `stud_id` int DEFAULT NULL,
  `subject_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_load`
--

INSERT INTO `student_load` (`load_id`, `stud_id`, `subject_id`) VALUES
(2, 2, 1),
(3, 3, 1),
(6, 5, 3),
(7, 8, 2),
(8, 13, 4);

-- --------------------------------------------------------

--
-- Table structure for table `student_tbl`
--

CREATE TABLE `student_tbl` (
  `stud_id` int NOT NULL,
  `lname` varchar(30) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `middle` varchar(5) NOT NULL,
  `program_id` int DEFAULT NULL,
  `Allowance` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_tbl`
--

INSERT INTO `student_tbl` (`stud_id`, `lname`, `fname`, `middle`, `program_id`, `Allowance`) VALUES
(2, 'MONKEY', 'LUFFY', 'D', 2, 5900),
(3, 'RORONOA', 'ZORO', 'K', 1, 2200),
(4, 'VINSMOKE', 'SANJI', 'A', 4, 1900),
(5, 'NICO', 'ROBIN', 'S', 5, 2100),
(6, 'CUTTY', 'FLAM', 'C', 2, 1500),
(7, 'GOL', 'ROGER', 'D', 3, 1800),
(8, 'PORTGAS', 'ACE', 'D', 1, 2000),
(9, 'MARSHALL', 'TEACH', 'D', 4, 1300),
(10, 'NEWGATE', 'EDWARD', 'R', 5, 1700),
(12, 'BRTHOLOMEW', 'KUMA', 'S', 3, 1600),
(13, 'DRACULE', 'MIHAWK', 'W', 1, 2200),
(14, 'SILVERS', 'RAYLEIGH', 'T', 4, 1400),
(15, 'BOA', 'HANCOCK', 'G', 5, 2100),
(16, 'EUSTASS', 'KID', 'L', 2, 1800),
(17, 'TRAFALGAR', 'WATERLAW', 'D', 3, 1750),
(18, 'MONKEY', 'GARP', 'D', 1, 1900),
(19, 'GALLANO', 'ZEL', 'C', 4, 2000),
(20, 'GALLANO', 'NAMI', 'C', 5, 1500),
(21, 'RORONOA', 'FARID', 'C', 2, 1350);

-- --------------------------------------------------------

--
-- Table structure for table `subject_tbl`
--

CREATE TABLE `subject_tbl` (
  `subject_id` int NOT NULL,
  `subject_name` varchar(100) DEFAULT NULL,
  `sem_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subject_tbl`
--

INSERT INTO `subject_tbl` (`subject_id`, `subject_name`, `sem_id`) VALUES
(1, 'Introduction to Programming', 1),
(2, 'Data Structures', 2),
(3, 'Database Management', 3),
(4, 'Accounting Principles', 4),
(5, 'Educational Psychology', 5),
(6, 'WEB DEVELOPMENT 99', 4);

-- --------------------------------------------------------

--
-- Table structure for table `year_tbl`
--

CREATE TABLE `year_tbl` (
  `year_id` int NOT NULL,
  `year_from` int DEFAULT NULL,
  `year_to` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `year_tbl`
--

INSERT INTO `year_tbl` (`year_id`, `year_from`, `year_to`) VALUES
(1, 2023, 2024),
(2, 2024, 2025),
(3, 2025, 2026),
(4, 2026, 2027);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `institute_tbl`
--
ALTER TABLE `institute_tbl`
  ADD PRIMARY KEY (`ins_id`);

--
-- Indexes for table `program_tbl`
--
ALTER TABLE `program_tbl`
  ADD PRIMARY KEY (`program_id`),
  ADD KEY `ins_id` (`ins_id`);

--
-- Indexes for table `semester_tbl`
--
ALTER TABLE `semester_tbl`
  ADD PRIMARY KEY (`sem_id`),
  ADD KEY `year_id` (`year_id`);

--
-- Indexes for table `student_load`
--
ALTER TABLE `student_load`
  ADD PRIMARY KEY (`load_id`),
  ADD KEY `stud_id` (`stud_id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- Indexes for table `student_tbl`
--
ALTER TABLE `student_tbl`
  ADD PRIMARY KEY (`stud_id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indexes for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
  ADD PRIMARY KEY (`subject_id`),
  ADD KEY `sem_id` (`sem_id`);

--
-- Indexes for table `year_tbl`
--
ALTER TABLE `year_tbl`
  ADD PRIMARY KEY (`year_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `institute_tbl`
--
ALTER TABLE `institute_tbl`
  MODIFY `ins_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `program_tbl`
--
ALTER TABLE `program_tbl`
  MODIFY `program_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `semester_tbl`
--
ALTER TABLE `semester_tbl`
  MODIFY `sem_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `student_load`
--
ALTER TABLE `student_load`
  MODIFY `load_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `student_tbl`
--
ALTER TABLE `student_tbl`
  MODIFY `stud_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `subject_tbl`
--
ALTER TABLE `subject_tbl`
  MODIFY `subject_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `year_tbl`
--
ALTER TABLE `year_tbl`
  MODIFY `year_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `program_tbl`
--
ALTER TABLE `program_tbl`
  ADD CONSTRAINT `program_tbl_ibfk_1` FOREIGN KEY (`ins_id`) REFERENCES `institute_tbl` (`ins_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `semester_tbl`
--
ALTER TABLE `semester_tbl`
  ADD CONSTRAINT `semester_tbl_ibfk_1` FOREIGN KEY (`year_id`) REFERENCES `year_tbl` (`year_id`);

--
-- Constraints for table `student_load`
--
ALTER TABLE `student_load`
  ADD CONSTRAINT `student_load_ibfk_1` FOREIGN KEY (`stud_id`) REFERENCES `student_tbl` (`stud_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_load_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject_tbl` (`subject_id`);

--
-- Constraints for table `student_tbl`
--
ALTER TABLE `student_tbl`
  ADD CONSTRAINT `student_tbl_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `program_tbl` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
