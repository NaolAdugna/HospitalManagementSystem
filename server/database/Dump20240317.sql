CREATE DATABASE  IF NOT EXISTS `hospitalmanagementsystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hospitalmanagementsystem`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: hospitalmanagementsystem
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `sex` varchar(10) NOT NULL,
  `dateofbirth` date NOT NULL,
  `region` varchar(45) NOT NULL,
  `woreda` varchar(45) NOT NULL,
  `katana` varchar(45) DEFAULT NULL,
  `kebele` varchar(45) NOT NULL,
  `housenumber` varchar(45) DEFAULT NULL,
  `phonenumber` varchar(45) NOT NULL,
  `nameoffacility` varchar(45) DEFAULT NULL,
  `medicalrecordnumber` varchar(45) NOT NULL,
  `dateofregistration` date NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'Naol','Adugna','Edesa','Male','1994-12-05','Oromia','Ambo','02','02','','0947102035','','BU717','2013-04-03','naoladugna@gmail.com',''),(2,'Iyasu','Dabala','Galata','Male','1993-03-04','Oromia','nekemte','nekemte','nekemte','','0920304050','','BU321','2013-04-11','iyasu@gmail.com','$2b$04$NV3XbQyHdzAXFv1nv8hi6udnVuoNZ/vuRRpIG4rkdGy7ixUMcmwEi'),(3,'Iyasu','Dabala','Galata','Male','1993-03-04','Oromia','nekemte','nekemte','nekemte','','0920304050','','BU321','2013-04-11','iyasu@gmail.com','$2b$04$uPGxS3cnKzfuLS3nEf84O.NvpBBarMtFmAWUN5KOQVQdfvOS0BiRu'),(4,'Iyasu','Dabala','Galata','Male','1993-03-04','Oromia','nekemte','nekemte','nekemte','','0920304050','','BU321','2013-04-11','iyasu@gmail.com','$2b$04$lTIvQlMs5TcxOoad4MlCgueBRb6RmlD4LB.fi44rEVUanKH8b59ge'),(5,'Kaleb','Dabala','Galata','Male','1993-03-04','Oromia','nekemte','nekemte','nekemte','','0920304050','','BU321','2013-04-11','iyasu@gmail.com','$2b$04$tXU202dK6ZHzwHKD1.5sUuVZwbwnC72kD5Vopst8vEuuHngjWaf1i'),(6,'abeni','Debalke','Galata','Male','1992-04-01','amahara','debrebrehan','debrebrehan','debrebrehan','','0920304050','','bu432','2024-03-09','abenizar@gmail.com','$2b$04$sUE3hOUTobqdiORWydzAlOrApTQaZdof08X50wl79VDKnmY7zNLuS');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `dateofregistration` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `emaiil_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'Test2','$2b$10$H8PSNRQgAiUrzOw4M2/Yq.SaHIQuKdHgw93jcTHEa3gYv8EDFOoFi','doctor','Test2@gmail.com','2024-03-15 11:20:25'),(7,'wudu','$2b$10$tyWgcKviZ9ZvxgAMUmjLSu1/KN8FM/pVZHd33o5ZzU/nYG7/4pNYK','labratorytechnician','wudu@gmail.com','2024-03-15 16:45:03'),(8,'Test','$2b$10$MQO07XiVAINeDpQ4TYYyOuspKgD6FrXtkEQizc5M.GNoYYwb6vQpS','administrator','test@gmail.com','2024-03-15 17:24:32'),(10,'Test3','$2b$10$KUQNysD4yLZYHqG.dKmH7exlYIb9aZJw1mD2ETEvb5gXKcqFkOw6S','receptionist','test3@gmail.com','2024-03-16 16:54:21'),(11,'Iyasu','$2b$10$0OmE8YBb51SQTN6Kg7avV.oEum52Q3AFIlECHWM/K2e7KssJ35pdq','pharmacist','IyasuD@gmal.com','2024-03-16 22:03:54');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-17 17:04:00
