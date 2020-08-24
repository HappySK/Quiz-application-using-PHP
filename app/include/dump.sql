create database quiz

CREATE table reg_table(id INTEGER(20) NOT NULL,firstname VARCHAR(255),lastname VARCHAR(255),email VARCHAR(255),password VARCHAR(255))

CREATE table questions(id INTEGER(20) NOT NULL, questions VARCHAR(255),option1 VARCHAR(255),option2 VARCHAR(255),option3 VARCHAR(255),option4 VARCHAR(255),answer VARCHAR(255))

CREATE leaderboard(id INTEGER(20),uid INTEGER(20),name VARCHAR(255),score VARCHAR(255))