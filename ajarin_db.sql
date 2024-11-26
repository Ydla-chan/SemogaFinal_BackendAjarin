-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 26, 2024 at 09:27 AM
-- Server version: 8.0.30
-- PHP Version: 8.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ajarin_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_tb`
--

CREATE TABLE `user_tb` (
  `userid` int NOT NULL,
  `UrlProfile` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('L','P') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_tb`
--

INSERT INTO `user_tb` (`userid`, `UrlProfile`, `name`, `email`, `password`, `gender`) VALUES
(4, '/Aldy.jpg', 'Aldy Jhonatan hutasoit', 'Aldyjhonatanhutasoit.1', 'password123', 'L'),
(8, 'http://example.com/profile.jpg', 'SudahSaatnya Tidur', 'Tidur123@gmail.com', '$2a$10$cxToxt6HMqvQkK3RhxPWm.2S.jIhXKV.wZaoxBU.ESQ5xisczGk86', 'P'),
(9, 'http://example.com/profile.jpg', 'SudahSaatnya Tidur', 'Tidur12333@gmail.com', '$2a$10$o88HF278ihqy85N.qpveS.HjHqK2ppIGv2SODHr4nyb9iU/AEb5BW', 'P'),
(10, 'http://example.com/profile.jpg', 'SudahSaatnya Tidur', 'ewe@gmail.com', '$2a$10$RfcKhxwbPxUJmLYqTIGFNu8J98H2liMa2rh0YJCqBWzg2M3hzm0wK', 'P'),
(11, 'http://example.com/profile.jpg', 'SudahSaatnya Tidur', 'Aku@gmail.com', '$2a$10$2VLaZ0D2me602Av1xUQ2meRmTwC.gBwAlKzGoVJu0buOLTijF74e.', 'P');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_tb`
--
ALTER TABLE `user_tb`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_tb`
--
ALTER TABLE `user_tb`
  MODIFY `userid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
