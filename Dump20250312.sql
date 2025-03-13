-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hrams
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `applicant_document`
--

DROP TABLE IF EXISTS `applicant_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applicant_document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `applicantId_Entry` int(11) DEFAULT NULL,
  `fileName` longtext DEFAULT NULL,
  `fileUrl` longtext DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicant_document`
--

LOCK TABLES `applicant_document` WRITE;
/*!40000 ALTER TABLE `applicant_document` DISABLE KEYS */;
INSERT INTO `applicant_document` VALUES (1,1,'transcriptRecord','https://res.cloudinary.com/dokmtf3hz/image/upload/v1741772155/applicant_registry/z9etncsoo5ywjhmnypca.jpg','image/png'),(2,1,'diploma','https://res.cloudinary.com/dokmtf3hz/image/upload/v1741772156/applicant_registry/ylpongkcn37gxnx3nojg.jpg','image/png'),(3,1,'applicationLetter','https://res.cloudinary.com/dokmtf3hz/image/upload/v1741772157/applicant_registry/xyss6kw5oelf2tgozwvi.jpg','image/jpeg'),(4,1,'resume','https://res.cloudinary.com/dokmtf3hz/image/upload/v1741772158/applicant_registry/zdswyhevawfjzzljnsd0.jpg','image/jpeg'),(5,2,'transcriptRecord','https://res.cloudinary.com/dokmtf3hz/image/upload/v1741777279/applicant_registry/a4yiiqj4jap5ryvp37nm.jpg','image/png'),(6,2,'diploma','https://res.cloudinary.com/dokmtf3hz/image/upload/v1741777281/applicant_registry/lni6ad0rg4zfhqmtgdbj.jpg','image/jpeg'),(7,2,'applicationLetter','https://res.cloudinary.com/dokmtf3hz/image/upload/v1741777282/applicant_registry/ifrcthov2xsgs41b32uc.jpg','image/png'),(8,2,'resume','https://res.cloudinary.com/dokmtf3hz/image/upload/v1741777284/applicant_registry/fgodu6cbyisshpkwo9cx.jpg','image/png'),(9,3,'transcriptRecord','https://res.cloudinary.com/dokmtf3hz/image/upload/v1741778505/applicant_registry/hgmktig153wgyiusbdqd.jpg','image/jpeg'),(10,3,'diploma','https://res.cloudinary.com/dokmtf3hz/image/upload/v1741778506/applicant_registry/zoi5mkjaqqpnusec858c.jpg','image/png'),(11,3,'applicationLetter','https://res.cloudinary.com/dokmtf3hz/image/upload/v1741778508/applicant_registry/gjjltkyoqvgehn5srkin.jpg','image/jpeg'),(12,3,'resume','https://res.cloudinary.com/dokmtf3hz/image/upload/v1741778509/applicant_registry/alxpssbdklhzbqcvjmll.jpg','image/png');
/*!40000 ALTER TABLE `applicant_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application_entry`
--

DROP TABLE IF EXISTS `application_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application_entry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `contactNumber` varchar(255) DEFAULT NULL,
  `completeAddress` longtext DEFAULT NULL,
  `educationDegree` varchar(255) DEFAULT NULL,
  `applyingFor` longtext DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `department` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_entry`
--

LOCK TABLES `application_entry` WRITE;
/*!40000 ALTER TABLE `application_entry` DISABLE KEYS */;
INSERT INTO `application_entry` VALUES (1,1,'Dela Cruz','Juan','Del','juanpalitan@gmail.com','927894154','Santa maria licab nueva ecija','Masters','Marketing Analyst','2025-03-12 09:36:00','PENDING','Marketing'),(2,1,'Dela Cruz','Juan','Del','juanpalitan@gmail.com','927894154','Santa maria licab nueva ecija','Masters','HR Manager','2025-03-12 11:01:26','PENDING','Human Resources'),(3,4,'Santos','Alfredo Jr','Batilong','Tester@gmail.com','923128418412','Santa maria licab nueva ecija','Masters','Marketing Analyst','2025-03-12 11:21:51','APPROVED','Marketing');
/*!40000 ALTER TABLE `application_entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `jobId` int(11) NOT NULL AUTO_INCREMENT,
  `position` longtext DEFAULT NULL,
  `department` longtext DEFAULT NULL,
  `requirements` longtext DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`jobId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'Software Engineer','IT','<div><ul>\n  <li>Bachelor&apos;s Degree in Computer Science</li>\n  <li>3+ years of experience in software development</li>\n  <li>Proficiency in JavaScript, Python, or Java</li>\n  <li>Experience with version control (Git)</li>\n  <li>Familiarity with Agile methodologies</li>\n  <li>Strong problem-solving skills</li>\n</ul></div>','Open','2025-03-12 16:41:51','Part Time'),(2,'HR Manager','Human Resources','<div><ul>\n  <li>5+ years experience in HR management</li>\n  <li>Excellent interpersonal and communication skills</li>\n  <li>In-depth knowledge of labor laws and compliance</li>\n  <li>Proven leadership and team management abilities</li>\n  <li>Conflict resolution and negotiation skills</li>\n  <li>Strong organizational and time management skills</li>\n</ul></div>','Closed','2025-03-12 16:41:51','Full Time'),(3,'Marketing Analyst','Marketing','<div><ul>\n  <li>Bachelor&apos;s Degree in Marketing or related field</li>\n  <li>Proficiency in SEO and social media platforms</li>\n  <li>Strong analytical and data interpretation skills</li>\n  <li>Experience with digital marketing tools and analytics</li>\n  <li>Ability to identify market trends and consumer insights</li>\n  <li>Excellent written and verbal communication skills</li>\n</ul></div>','Open','2025-03-12 16:41:51','Full Time'),(4,'Data Scientist','IT','<div><ul>\n  <li>Advanced degree in Data Science, Statistics, or related field</li>\n  <li>Proficiency in Python and machine learning frameworks (e.g., TensorFlow, PyTorch)</li>\n  <li>Strong statistical analysis and data modeling skills</li>\n  <li>Experience with SQL and data visualization tools (e.g., Tableau)</li>\n  <li>Knowledge of big data platforms (e.g., Hadoop, Spark) is a plus</li>\n  <li>Ability to communicate complex data insights to non-technical stakeholders</li>\n</ul></div>','Open','2025-03-12 16:41:51','Full Time'),(5,'Sales Executive','Sales','<div><ul>\n  <li>Proven experience as a sales executive or similar role</li>\n  <li>Excellent communication and interpersonal skills</li>\n  <li>Strong negotiation and presentation skills</li>\n  <li>Experience with CRM software and sales analytics tools</li>\n  <li>Demonstrated ability to build and maintain client relationships</li>\n  <li>Target-driven mindset with a proven track record of meeting sales targets</li>\n</ul></div>','Closed','2025-03-12 16:41:51','Part Time');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `accountId` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` longtext DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userType` varchar(255) DEFAULT NULL,
  `profile` longtext DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`accountId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Juan Del Dela Cruz','juanpalitan@gmail.com','$2b$10$UqvOscP.fQiqz/8/RhhF.unWsZmqg9F6GO44P99Ii2QeAWXV0Nf1y','applicant','','2025-03-11 09:27:00',NULL),(2,'Administrator','admin@gmail.com','$2b$10$UqvOscP.fQiqz/8/RhhF.unWsZmqg9F6GO44P99Ii2QeAWXV0Nf1y','admin',NULL,'2025-03-11 09:27:00',NULL),(3,'HR','hr@gmail.com','$2b$10$UqvOscP.fQiqz/8/RhhF.unWsZmqg9F6GO44P99Ii2QeAWXV0Nf1y','hr',NULL,'2025-03-11 09:27:00','Marketing'),(4,'Alfredo Jr Batilong Santos','Tester@gmail.com','$2b$10$M/y8j0dvP9K6gm.N3KzUQeesTHiav.wQy5/Mn3wFFi1UpgvoPoOja','applicant','','2025-03-12 11:20:19',NULL);
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

-- Dump completed on 2025-03-12 21:25:29
