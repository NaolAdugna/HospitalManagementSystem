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
-- Table structure for table `deletedusers`
--

DROP TABLE IF EXISTS `deletedusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deletedusers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `reason` longtext NOT NULL,
  `deletedby` varchar(255) NOT NULL,
  `dateofdeletion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deletedusers`
--

LOCK TABLES `deletedusers` WRITE;
/*!40000 ALTER TABLE `deletedusers` DISABLE KEYS */;
INSERT INTO `deletedusers` VALUES (1,'Iyasu','pharmacist','Iyasu@gmal.com','fired from work','admin','2024-04-12 20:29:39'),(2,'Test3','receptionist','test3@gmail.com','Died.','admin','2024-04-12 20:30:59'),(3,'doctor','doctor','Test2@gmail.com','Fired b/c of discipline.','admin2','2024-04-12 20:33:52'),(4,'doctor','','doctor@gmail.com','fired\n','admin','2024-04-15 20:44:29'),(5,'admin2','administrator','admin2@gmail.com','unnecessary user. ','admin','2024-04-15 20:48:19'),(6,'pharma','pharmacist','pharma@gmail.com','Fired from work.','admin','2024-04-16 08:50:39'),(7,'lab','labTechnician','test2@gmail.com','Died.','admin','2024-04-16 08:55:30'),(8,'doctor','doctor','doctor@gmail.com','fired.','admin','2024-04-16 09:50:22'),(9,'reception','receptionist','reception@gmail.com','fired.','admin','2024-04-16 10:17:55');
/*!40000 ALTER TABLE `deletedusers` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lists`
--

LOCK TABLES `lists` WRITE;
/*!40000 ALTER TABLE `lists` DISABLE KEYS */;
INSERT INTO `lists` VALUES (1,'bookslist','2024-03-23 11:40:17',NULL),(2,'bookslistad','2024-03-23 18:39:58',NULL),(3,'testmonday','2024-03-23 18:40:56',NULL),(4,'test123','2024-03-23 18:41:43',NULL),(5,'bookslistad','2024-03-23 18:54:42',8),(6,'[object Object]','2024-03-23 18:56:45',8),(8,'paybill','2024-03-24 07:32:44',8);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'test','test@gmail.com','this is the third time trying for test the first two responsed with 500 status','2024-04-09 10:34:31'),(2,'Test2','test2@gmail.com','This is the second test trying from contact us interface i hope i work like it intended.','2024-04-09 10:35:49'),(3,'Test3','test3@gmail.com','this is the third test.','2024-04-09 10:36:47'),(4,'Test4','test4@gmail.com','this is test 4.','2024-04-09 10:38:31'),(5,'Test5','test5@gmail.com','this is test5.','2024-04-09 10:39:11'),(6,'Test6','test6@gmail.com','this is Test6','2024-04-09 10:40:07'),(7,'Test7','test7@gmail.com','this is Test7','2024-04-09 10:42:13'),(8,'Test8','test8@gmail.com','this is Test8','2024-04-09 10:45:52'),(9,'test0','test0@gmail.com','this is another test.','2024-04-09 20:37:40'),(10,'test11','test11@gmail.com','this is another test for 11.','2024-04-09 20:38:33'),(11,'Iyasu Test','iyasutest@gmail.com','this me iyasu testing the form.','2024-04-09 22:30:16'),(12,'Iyasu ','iyasu@gmail.com','This message is test of message.','2024-04-12 21:41:56'),(13,'Solomon Reda','Sol@gmail.com','This is solomon asking for you serivce.','2024-04-16 20:47:16');
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
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `gender` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `medicalhistory` longtext NOT NULL,
  `dateofregistration` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (2,'test3','$2b$10$mVQsHR5IEXYpsQhYCPsanebjgFQ0ICq3kQ9VLCRw/G6jZIBJrXq7i',15,'female','waleligndamene@gmail.com','','2024-04-13 09:55:38'),(3,'iyasu','$2b$10$zwOupfTZNDURf96Ao4BEN..GFNnl4UEche/30JJq6l8Qp6w/vWj2q',24,'male','eyasudabala@gmail.com','','2024-04-13 09:59:22'),(4,'test5','$2b$10$up7h0fTuV4eNcMX1dpOWL./Iaux8jZZkuuOCVypemtRN.ftpriVlW',5,'male','test5@gmail.com','undefined','2024-04-13 22:00:18'),(5,'test6','$2b$10$R41twMvpDxbSsWhCmJ0aQ.wU8cOV6uDyOY0cRdbsfQ/x7r6dTCf7e',6,'female','test6@gmail.com','undefined','2024-04-13 22:01:22'),(6,'text11','$2b$10$U9fYzLP131l1x2sCIgW6iuZLSdr7SO05L8/8aNj7jvQ1HmAycHzEC',55,'male','text11@gmail.com','undefined','2024-04-14 08:36:32'),(7,'text12','$2b$10$7gaBl76bzbJnflsiADkvGe8cN59LTg7cOd8r6XZvGVz2aH9aMMaOu',53,'female','text12@gmail.com','undefined','2024-04-14 08:37:40'),(8,'texti','$2b$10$7T1XWAYp7yNrorn/SYjhCubQKudpxRKhzbWQfpUFlUQ6mHvCDtyJG',6,'male','textiyu@gmail.com','undefined','2024-04-14 10:51:01'),(9,'SolReda','$2b$10$lkzxnzFrVPyUddK8xgIo3OHUyi1OgntSLH4JjPOvcOZ4Cxxpjpd3C',23,'male','solomonreda009@gmail.com','undefined','2024-04-16 21:23:04');
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'admin','$2b$10$yAUS2vviCX7ZIQ13iufOCOmlaWbnGcB51VRXtyhnBwV2xEWSis5nq','administrator','test@gmail.com','2024-03-15 17:24:32'),(23,'reception','$2b$10$q9ZMS4NQF3yyLn1MFtPRTeL3Z8tMzwiubogQoV4FxbjJp0xAjHcGC','receptionist','reception@gmail.com','2024-04-16 10:29:46'),(24,'doctor','$2b$10$CZ.a.hCYZTzISvozPSmCB.8WWZ/a2buc2I9BtV2m/2nieWkbKB8Um','doctor','doctor@gmail.com','2024-04-16 17:34:20'),(25,'pharmacy','$2b$10$qxV85GRdbB/YuFxft5t4seTVFu3giOuni7Z/lNqXhY5aiS5gSxbWC','pharmacist','pharmacy@gmail.com','2024-04-16 17:35:24'),(26,'lab','$2b$10$HcqFGEdIr5Jg.1G8fs02rOCDZvd/PrUm48yOzLHzsbPsO/1zxKYf6','labTechnician','lab@gmail.com','2024-04-16 17:36:10');
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

-- Dump completed on 2024-04-16 22:08:02
