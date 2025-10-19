-- CareerFlow Resume Builder - MySQL Setup Script
-- This script creates the database and sets up basic configuration

-- Create database
CREATE DATABASE IF NOT EXISTS `careerflow`
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE `careerflow`;

-- Create a dedicated user (optional)
-- CREATE USER 'careerflow'@'localhost' IDENTIFIED BY 'careerflow_password';
-- GRANT ALL PRIVILEGES ON careerflow.* TO 'careerflow'@'localhost';
-- FLUSH PRIVILEGES;

-- Show database info
SELECT 'CareerFlow database created successfully!' as message;
SELECT DATABASE() as current_database;
SHOW DATABASES LIKE 'careerflow';
