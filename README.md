# Barely Spotify Backend

A Node.js and Express backend REST API for a music streaming application. It supports role-based authentication, music file uploads, and album management.

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Tokens) & bcryptjs
* **Storage:** ImageKit (via `@imagekit/nodejs`)
* **File Uploads:** Multer

## Features
* **Role-Based Access Control:** Distinct roles for `user` and `artist`.
* **Authentication:** JWT-based secure login utilizing HTTP-only cookies.
* **Music Uploads:** Cloud storage integration with ImageKit for music file streaming.
* **Album Management:** Artists can group uploaded tracks into albums.

## Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

## API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/register` | Register a new account (`username`, `email`, `password`, `role`) | Public |
| POST | `/login` | Authenticate user and set JWT cookie | Public |
| POST | `/logout` | Clear JWT cookie | Public |

### Music & Albums (`/api/music`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/upload` | Upload a music file (multipart/form-data) | Artist |
| POST | `/album` | Create a new album | Artist |
| GET | `/` | Fetch a list of music tracks | Authenticated User |
| GET | `/albums` | Fetch all albums | Authenticated User |
| GET | `/albums/:albumId` | Fetch specific album details and associated tracks | Authenticated User |
