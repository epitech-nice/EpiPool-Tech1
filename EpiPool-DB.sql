-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Sep 28, 2024 at 08:16 AM
-- Server version: 9.0.1
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
-- Table structure for table `CONFIG`
--

CREATE TABLE `CONFIG` (
  `random_config` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `CONFIG`
--

INSERT INTO `CONFIG` (`random_config`) VALUES
(0);

-- --------------------------------------------------------

--
-- Table structure for table `LOGS`
--

CREATE TABLE `LOGS` (
  `log_id` int NOT NULL,
  `team_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `points` int NOT NULL,
  `reason` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `STUDENTS`
--

CREATE TABLE `STUDENTS` (
  `team_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `points` int NOT NULL,
  `position` int DEFAULT NULL,
  `student_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `STUDENTS`
--

INSERT INTO `STUDENTS` (`team_id`, `name`, `email`, `points`, `student_id`) VALUES
(NULL, 'Adam', 'adam.hannachi@epitech.eu', 0, 1),
(NULL, 'Alexandre', 'alexandre1.soler@epitech.eu', 0, 2),
(NULL, 'Alexandru', 'alexandru.tugui@epitech.eu', 0, 3),
(NULL, 'Ali', 'ali.abou-daher@epitech.eu', 0, 4),
(NULL, 'Ambre', 'ambre.parente@epitech.eu', 0, 5),
(NULL, 'Ana-belen', 'ana-belen.correa@epitech.eu', 0, 6),
(NULL, 'Antoine', 'antoine.marchi@epitech.eu', 0, 7),
(NULL, 'Antony', 'antony.poliautre@epitech.eu', 0, 8),
(NULL, 'Aryan', 'aryan.bhotey@epitech.eu', 0, 9),
(NULL, 'Axel', 'axel.pescio@epitech.eu', 0, 10),
(NULL, 'Bach-long', 'bach-long.huynh@epitech.eu', 0, 11),
(NULL, 'Baptiste', 'baptiste.poignot@epitech.eu', 0, 12),
(NULL, 'Charles', 'charles.corsiero@epitech.eu', 0, 13),
(NULL, 'Dan', 'dan.ben-mergui@epitech.eu', 0, 14),
(NULL, 'Elie', 'elie.bernard@epitech.eu', 0, 15),
(NULL, 'Enzo', 'enzo.bazin@epitech.eu', 0, 16),
(NULL, 'Eric', 'eric.faure-dunand-bruschi@epitech.eu', 0, 17),
(NULL, 'Erwan', 'erwan.cholley-maisonneuve@epitech.eu', 0, 18),
(NULL, 'Florent', 'florent.serra@epitech.eu', 0, 19),
(NULL, 'Florian', 'florian.demartini@epitech.eu', 0, 20),
(NULL, 'Gabriel .N', 'gabriel.nougaillac@epitech.eu', 0, 21),
(NULL, 'Gabriel .S', 'gabriel.spanneut-peressutti@epitech.eu', 0, 22),
(NULL, 'Hilal', 'hilal.tarhan@epitech.eu', 0, 23),
(NULL, 'James', 'james.farrell@epitech.eu', 0, 24),
(NULL, 'Jarod', 'jarod.dupre@epitech.eu', 0, 25),
(NULL, 'Jeremy', 'jeremy.albertini@epitech.eu', 0, 26),
(NULL, 'Jules', 'jules.martins@epitech.eu', 0, 27),
(NULL, 'Juliette', 'juliette.marinier@epitech.eu', 0, 28),
(NULL, 'Leo .D', 'leo.drevon@epitech.eu', 0, 29),
(NULL, 'Leo .T', 'leo.tisserand@epitech.eu', 0, 30),
(NULL, 'Louis', 'louis.chatel-karras@epitech.eu', 0, 31),
(NULL, 'Lucas', 'lucas.lemonnier@epitech.eu', 0, 32),
(NULL, 'Mael', 'mael.becret@epitech.eu', 0, 33),
(NULL, 'Matteo', 'matteo.ludovici@epitech.eu', 0, 34),
(NULL, 'Nicolas', 'nicolas.brai@epitech.eu', 0, 35),
(NULL, 'Pierre', 'pierre.bonnet@epitech.eu', 0, 36),
(NULL, 'Raphael .A', 'raphael.agramunt@epitech.eu', 0, 37),
(NULL, 'Raphael .D', 'raphael.dedack@epitech.eu', 0, 38),
(NULL, 'Raphael .G', 'raphael.guillot@epitech.eu', 0, 39),
(NULL, 'Ricardo', 'ricardo.forcina@epitech.eu', 0, 40),
(NULL, 'Simon', 'simon.puccio@epitech.eu', 0, 41),
(NULL, 'Sixtine', 'sixtine.gonin@epitech.eu', 0, 42),
(NULL, 'Soha', 'soha.larbi@epitech.eu', 0, 43),
(NULL, 'Stefan', 'stefan.kadzharov@epitech.eu', 0, 44),
(NULL, 'Theo', 'theo.deshons@epitech.eu', 0, 45),
(NULL, 'Thomas .B', 'thomas.ballandras-carbonel@epitech.eu', 0, 46),
(NULL, 'Thomas .G', 'thomas.giudici@epitech.eu', 0, 47),
(NULL, 'Timothee', 'timothee.ouzeau@epitech.eu', 0, 48),
(NULL, 'Tom .B', 'tom.bentura@epitech.eu', 0, 49),
(NULL, 'Tom .H', 'tom.heirich@epitech.eu', 0, 50),
(NULL, 'Tom .M', 'tom.marmoz@epitech.eu', 0, 51),
(NULL, 'Ugo', 'ugo.maddalena-chupin@epitech.eu', 0, 52),
(NULL, 'Yannick', 'yannick.kahl@epitech.eu', 0, 53),
(NULL, 'Zara', 'zara.jaber@epitech.eu', 0, 54);

-- --------------------------------------------------------

--
-- Table structure for table `TEAMS`
--

CREATE TABLE `TEAMS` (
  `team_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `image_name` longblob NULL,
  `points` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `TEAMS`
--

INSERT INTO `TEAMS` (`team_id`, `name`, `color`, `image_name`, `points`) VALUES
(1, 'DevOps Bards', 'Green', 'devops_bard.jpg', 0),
(2, 'Game Alchemists', 'Blue', 'game_alchemist.jpg', 0),
(3, 'Bugs Hunters', 'Red', 'bugs_hunter.jpg', 0),
(4, 'Kernel Barbarians', 'Yellow', 'kernel_barbarian.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`id`, `email`, `password`, `name`, `createdAt`, `updatedAt`) VALUES
(2, 'eric1.deschodt@epitech.eu', '$2a$10$SrdMWb2B4oxeJGuBWqF8jOjcsN4CbrP3JeMEUYFytefA31WfNeoH.', 'Eric', '2024-09-28 06:59:44', '2024-09-28 06:59:44'),
(3, 'darius1.morel@epitech.eu', '$2a$10$qILGzksUzzlFva6xQNOh/.c5MA7ixrvjsWMFxOgh5sy7EaSdkiFyG', 'Darius', '2024-09-28 07:01:03', '2024-09-28 07:01:03'),
(4, 'renaud1.juliani@epitech.eu', '$2a$10$nwGtbmZiV8Qm/rgb0bXPMOReP8OSxZkoVZGOtJk23oBItflilHjvq', 'Renaud', '2024-09-28 07:02:04', '2024-09-28 07:02:04'),
(5, 'romaric1.moy@epitech.eu', '$2a$10$Tt.UW8UPp4wrGu5C.VYw.eTAuxkQ/fCzNkdpvnt7ofBYphOQYb5ny', 'Romaric', '2024-09-28 07:02:48', '2024-09-28 07:02:48'),
(6, 'enzo1.pascallon@epitech.eu', '$2a$10$nJKCjIPW1XM6F6u9xN3TMO/m4dLE173B3D8t6tdRYe9IedO2ipe/6', 'Enzo', '2024-09-28 07:03:27', '2024-09-28 07:03:27'),
(7, 'leonard1.oursel@epitech.eu', '$2a$10$yujnJuv0w1V7uW9aloSf3OwuUhtOTptybb2LtrRgOYbgPgqvplzim', 'Leonard', '2024-09-28 07:04:12', '2024-09-28 07:04:12'),
(8, 'nathan1.tirolf@epitech.eu', '$2a$10$GC1FTjiEQAiBylEW6V9SHepRxcW5ZklEIsCI9tEFjTtIEp/LzBD4K', 'Nathan', '2024-09-28 07:04:49', '2024-09-28 07:04:49'),
(9, 'daniil1.stepanov@epitech.eu', '$2a$10$DcdsQXuzl989IsSfdPg0S.coZRFfUvbysIi85T8Zf5sBYy/u50n8q', 'Dan', '2024-09-28 07:05:17', '2024-09-28 07:05:17'),
(10, 'kyliann1.pouchin@epitech.eu', '$2a$10$cR5mcxMQdQog8m5.NtjKEeNistkI.RDFvgBBqM6zWTgl6kA4lHdP6', 'Kyliann', '2024-09-28 07:05:44', '2024-09-28 07:05:44'),
(11, 'mathis1.gheri@epitech.eu', '$2a$10$1yqFqw7Izf5K4kwuhs245Or9hjNsx51cSSxp4kmlvMfOro9Ggs9u6', 'Mathis', '2024-09-28 07:06:26', '2024-09-28 07:06:26'),
(12, 'camille1.ricardon@epitech.eu', '$2a$10$CJQ552N6ewVm.rowsXWVaed5WHqL4YtkIhBcY0uVCV65XwJI69np2', 'Camille', '2024-09-28 07:07:04', '2024-09-28 07:07:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `LOGS`
--
ALTER TABLE `LOGS`
  ADD PRIMARY KEY (`log_id`);

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
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `LOGS`
--
ALTER TABLE `LOGS`
  MODIFY `log_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `STUDENTS`
--
ALTER TABLE `STUDENTS`
  MODIFY `student_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `TEAMS`
--
ALTER TABLE `TEAMS`
  MODIFY `team_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;