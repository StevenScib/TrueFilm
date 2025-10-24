"# TrueFilm" 
Truefilm is a fullstack application that allows users to sign in securely to see the current popular films, find recomendations, have a watchlist and be able to review films and add it to the application.
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


2. Create a new MySQL database and set up a connection with these settings (Use your own password):

   <img width="882" height="591" alt="Mysqlconfig" src="https://github.com/user-attachments/assets/4ef64593-0734-4594-8a8e-ae75858eb844" />

Once the connection is set input 
CREATE DATABASE truefilm_new;
   <img width="1013" height="103" alt="Create database" src="https://github.com/user-attachments/assets/3ba0f70e-dcfc-472f-89d7-bd058fb4ebf2" />


4. Update your database details (Password used in the connection setup) in src/main/resources/application.yml in backend:

<img width="1030" height="151" alt="Backend" src="https://github.com/user-attachments/assets/c6e4c54d-31d5-4b09-b566-d18a8b43cf15" />

    password: your_password (That was set in Mysql)

4. Run the backend:

   
<img width="1815" height="346" alt="Run" src="https://github.com/user-attachments/assets/b58b337b-9811-4fcd-a140-d5c9fc840b06" />


6. On frontend in console input "npm start"

<img width="558" height="130" alt="Frontend" src="https://github.com/user-attachments/assets/3288d289-bce8-47c0-ac1e-e900c1118dff" />


7. Enjoy the website!

<img width="1914" height="988" alt="Site" src="https://github.com/user-attachments/assets/9987c945-9cab-4e73-8f87-5c4ce7dc799e" />

