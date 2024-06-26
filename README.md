﻿<h1 align="center"> Movies Library </h1>

## Live Link:

      https://fasal-movies-library.netlify.app/

### Objective

This is a movie library web application with user authentication, movie search, and movie list creation features. Users can create public or private lists of their favorite movies.

![1717367384275](image/README/1717367384275.png)![1717367390741](image/README/1717367390741.png)![1717367400318](image/README/1717367400318.png)

### FEATURES LIST :

- User Authentication (Sign In/Sign Up)
- Search for movies using the OMDB API
- Create, view, and manage movie lists
- Public and private Playlists

## Tech Stack

- Frontend: React, React Router, Axios, CSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT
- Hosting: Vercel

## Run Scripts

```Terminal
git clone https://github.com/shhiivvaam/movies_library.git

cd movies_library
cd frontend
npm install
npm run dev

"open another terminal (locate to -> movies_library)

cd ..
cd backend
npm install
npm start
```

### Frontend

Add the following configurations in the `.env` file (FRONTEND)

```
   REACT_APP_API_URL=<your_backend_api_url>
   REACT_APP_OMDB_API_KEY<your_omdb_api_key>
```

### Backend

Add the following configurations in the `.env` file (BACKEND)

```
   MONGO_URI=<your_mongo_uri>
   JWT_SECRET=<your_jwt_secret>
   OMDB_API_KEY=<your_omdb_api_key>
```

Thank you for visiting!
