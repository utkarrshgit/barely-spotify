# Barely Spotify Backend

**Live API URL:** https://barely-spotify.onrender.com

A Node.js and Express backend for a music streaming platform. It features role-based authentication (Users and Artists), secure file uploading using ImageKit, and music/album management with MongoDB.

## Tech Stack
* **Framework:** Node.js with Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JSON Web Tokens (JWT) via cookies, Bcrypt
* **File Storage:** ImageKit, Multer

## Features
* **Role-Based Authentication:** Differentiates between regular `user` and `artist` roles.
* **Music Uploading:** Artists can upload music files directly to ImageKit.
* **Album Management:** Artists can group uploaded music into albums.
* **Music Browsing:** Authenticated users can fetch and browse available music and albums.

## Environment Variables
Create a `.env` file in the root directory and add the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Or start the production server:
```bash
npm start
```
The server will run on `http://localhost:3000`.

## API Endpoints

### Authentication (`/api/auth`)
* `POST /register` - Register a new user. Accepts `username`, `email`, `password`, and optional `role` ("user" or "artist").
* `POST /login` - Authenticate a user and set a JWT cookie. Accepts `username` (or `email`) and `password`.
* `POST /logout` - Clear the JWT cookie to log out.

### Music & Albums (`/api/music`)
* `POST /upload` - Upload a new music track. **(Artist only)**. Requires `title` in body and the audio file in `music` form-data.
* `POST /album` - Create a new album. **(Artist only)**. Accepts `title` and `musicIds` (array of music ObjectIds).
* `GET /` - Fetch a list of music tracks (limited to 10). **(Authenticated users)**.
* `GET /albums` - Fetch all available albums. **(Authenticated users)**.
* `GET /albums/:albumId` - Fetch details and tracks of a specific album by ID. **(Authenticated users)**.
