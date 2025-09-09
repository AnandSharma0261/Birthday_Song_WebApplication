-- Birthday Song Generator Database Setup Script
-- This script can be used with MongoDB or adapted for MySQL/PostgreSQL

-- MongoDB Collections (Document-based)

-- Users Collection
db.users.createIndex({ "phone": 1 }, { unique: true });
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "createdAt": 1 });

-- Songs Collection  
db.songs.createIndex({ "userId": 1 });
db.songs.createIndex({ "createdAt": 1 });
db.songs.createIndex({ "receiverName": 1 });

-- Sample Data
db.users.insertOne({
  "phone": "9876543210",
  "name": "Demo User",
  "email": "demo@example.com",
  "termsAccepted": true,
  "promoAccepted": true,
  "createdAt": new Date()
});

-- For MySQL/PostgreSQL, use this SQL equivalent:

/*
CREATE DATABASE birthday_song_app;
USE birthday_song_app;

CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  phone VARCHAR(15) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  terms_accepted BOOLEAN NOT NULL,
  promo_accepted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE songs (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  receiver_name VARCHAR(100) NOT NULL,
  age VARCHAR(10) NOT NULL,
  gender ENUM('Male', 'Female') NOT NULL,
  mood VARCHAR(50) NOT NULL,
  genre VARCHAR(50) NOT NULL,
  voice VARCHAR(20) NOT NULL,
  lyrics TEXT NOT NULL,
  audio_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  audio_generated_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_songs_user_id ON songs(user_id);
CREATE INDEX idx_songs_created_at ON songs(created_at);
*/
