
CREATE TABLE Student (StudentId int IDENTITY(1,1) PRIMARY KEY, FirstName varchar(255) NOT NULL, LastName varchar(255) NOT NULL, Email varchar(255) NOT NULL, Age int, Grade int);

INSERT INTO Student (FirstName, LastName, Email, Age, Grade) VALUES ("James","Nelson", "jamesknelson@gmail.com.com", "10", "5"),("Sally", "Brown","sallysmith@gmail.com", "10", "5"),("Jane", "Smith", "janesmith@gmail.com", "10", "5"),("Todd", "Nelson", "toddknelson@gmail.com", "12", "7"),("Jackson", "Brwon", "jacksonbrown@gmail.com", "18", "12")

DROP TABLE Student
