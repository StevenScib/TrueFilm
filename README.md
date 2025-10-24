"# TrueFilm" 
Truefilm is a fullstack application that allows users to sign in securley to see the current popular films, find recomendations, have a watchlist and be able to review films and add it to the application.


Run the Backend Locally to get the website uprunning

Requirements
Java 17+
Maven
MySQL Server (8.0+)

Steps
Clone the project:
git clone https://github.com/StevenScib/TrueFilm.git
cd TrueFilm/backend

Create a new MySQL database:
CREATE DATABASE truefilm_new;

Update your database details in src/main/resources/application.yml:
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/truefilm_new
    username: root
    password: your_password

Run the backend:
./mvnw spring-boot:run

Visit the app at:
👉 http://localhost:8080
