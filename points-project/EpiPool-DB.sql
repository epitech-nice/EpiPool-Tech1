-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jul 30, 2024 at 12:12 PM
-- Server version: 9.0.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `EpiPool-DB`
--

-- --------------------------------------------------------

--
-- Table structure for table `LOGS`
--

CREATE TABLE `LOGS` (
  `log_id` int NOT NULL,
  `team_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `points` int NOT NULL,
  `reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `POINTS`
--

CREATE TABLE `POINTS` (
  `team_id` int NOT NULL,
  `points` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `POINTS`
--

-- --------------------------------------------------------

--
-- Table structure for table `STUDENTS`
--

CREATE TABLE `STUDENTS` (
  `team_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `points` int NOT NULL,
  `student_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `STUDENTS`
--
-- --------------------------------------------------------

--
-- Table structure for table `TEAMS`
--

CREATE TABLE `TEAMS` (
  `team_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `filename` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `TEAMS`
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `LOGS`
--
ALTER TABLE `LOGS`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `POINTS`
--
ALTER TABLE `POINTS`
  ADD PRIMARY KEY (`team_id`);

--
-- Indexes for table `STUDENTS`
--
ALTER TABLE `STUDENTS`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `TEAMS`
--
ALTER TABLE `TEAMS`
  ADD PRIMARY KEY (`team_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `LOGS`
--
ALTER TABLE `LOGS`
  MODIFY `log_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `STUDENTS`
--
ALTER TABLE `STUDENTS`
  MODIFY `student_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `TEAMS`
--
ALTER TABLE `TEAMS`
  MODIFY `team_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;