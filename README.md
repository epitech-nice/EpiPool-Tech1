# EpiPool-Tech1
Interface de gestion des points de la piscine Tech1

# Launch the program
Run these commands :
- For the Frontend (at the root of the repository) :
```bash
cd points-project/frontend/
npm install
npm run serve
```
- For the Backend (at the root of the repository) :
```bash
cd points-project/backend/
npm install
node index.js
```
Then go to [localhost](http://localhost:8080/) to see the render.

# CSV Format
Documented must be formated like so :
name, email, name_team, color, points

If a student or a team is not in the DB it will be created. If no name and email are specified the points will go directly to the team.

# Sync student API
In a .env, you will find 2 variables IP_HUB as well as USER_TOKEN_API_LIONEL.
You'll need to replace IP_HUB by the actual IP adress of the Hub's computer and the USER_TOKEN_API_LIONEL needs to be replace with the Epitech intra token (of an AER).