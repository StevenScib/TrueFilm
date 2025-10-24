"# TrueFilm" 
Truefilm is a fullstack application that allows users to sign in securley to see the current popular films, find recomendations, have a watchlist and be able to review films and add it to the application.
Vs code was used for the frontend
Intellij for the backend
Mysql for the database

You have to run the Backend Locally to get the security and login and the reviews to display and work as intended since the website is yet to be deployed.

Requirements
Java 17+
Maven
MySQL Server (8.0+)
Vs code was used for the frontend
Intellij for the backend
Mysql for the database

Steps

1. Clone the project:
git clone https://github.com/StevenScib/TrueFilm.git
cd TrueFilm/backend

2. Create a new MySQL database:
CREATE DATABASE truefilm_new;

3. Update your database details in src/main/resources/application.yml:

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/truefilm_new
    username: root
    password: your_password

4. Run the backend:
./mvnw spring-boot:run


5. On frontend in console input npm start

6. Enjoy the website!
