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
-- Table structure for table `lists`
--

DROP TABLE IF EXISTS `lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lists`
--

LOCK TABLES `lists` WRITE;
/*!40000 ALTER TABLE `lists` DISABLE KEYS */;
INSERT INTO `lists` VALUES (1,'bookslist','2024-03-23 11:40:17',NULL),(2,'bookslistad','2024-03-23 18:39:58',NULL),(3,'testmonday','2024-03-23 18:40:56',NULL),(4,'test123','2024-03-23 18:41:43',NULL),(5,'bookslistad','2024-03-23 18:54:42',8),(6,'[object Object]','2024-03-23 18:56:45',8),(7,'bookslistadadcea','2024-03-24 06:06:05',11),(8,'paybill','2024-03-24 07:32:44',8);
/*!40000 ALTER TABLE `lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` longtext NOT NULL,
  `dateofmessagesent` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'test','test@gmail.com','this is the third time trying for test the first two responsed with 500 status','2024-04-09 10:34:31'),(2,'Test2','test2@gmail.com','This is the second test trying from contact us interface i hope i work like it intended.','2024-04-09 10:35:49'),(3,'Test3','test3@gmail.com','this is the third test.','2024-04-09 10:36:47'),(4,'Test4','test4@gmail.com','this is test 4.','2024-04-09 10:38:31'),(5,'Test5','test5@gmail.com','this is test5.','2024-04-09 10:39:11'),(6,'Test6','test6@gmail.com','this is Test6','2024-04-09 10:40:07'),(7,'Test7','test7@gmail.com','this is Test7','2024-04-09 10:42:13'),(8,'Test8','test8@gmail.com','this is Test8','2024-04-09 10:45:52');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'doctor','$2b$10$3TbSvGwRCLjPKjF3naN2Ue1uw023NWMkCmQCO5TZuQUvQLGDDJkFq','doctor','Test2@gmail.com','2024-03-15 11:20:25'),(8,'admin','$2b$10$yAUS2vviCX7ZIQ13iufOCOmlaWbnGcB51VRXtyhnBwV2xEWSis5nq','administrator','test@gmail.com','2024-03-15 17:24:32'),(10,'Test3','$2b$10$zdTyqJabCarZlWPOqNEZyey6wJ2TVy0qP.SkW0k2.HouEvfTDwpyO','receptionist','test3@gmail.com','2024-03-16 16:54:21'),(11,'Iyasu','$2b$10$n5MUnxuC6UPg1b99EkCHaeeMdu/Jr6rLlo2c4jkDsLYsLHNqaTGqi','pharmacist','Iyasu@gmal.com','2024-03-16 22:03:54'),(13,'Sol','$2b$10$DPqSd0IHK5osfUO2kfjhvuPWo1C3Duz130.L56wxnH.p9SGllFU/W','labTechnician','Sol@gmail.com','2024-03-18 21:33:31'),(16,'IyasuDabala','$2b$10$Ho9vJ6j69z3fBC6blwBx9O/oi0s7.a9RdqGUdm9MJOrOcJSjGIhXm','doctor','eyasudabala@gmail.com','2024-04-09 08:57:36');
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

-- Dump completed on 2024-04-09 10:52:35
