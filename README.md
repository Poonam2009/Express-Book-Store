# Express Book Store

A simple Express.js application for managing a collection of books using an in-memory data store.

## Features

- Get all books
- Get a book by ID
- Create a new book
- Delete a book by ID
- Basic request logging middleware

## Project Structure

- `index.js` - Main server entry point
- `routes/` - Route definitions for books
- `controllers/` - Controller logic (if used)
- `middlewares/` - Custom middleware
- `db/` - In-memory book data

## Installation

```bash
npm install
```

## Run the Server

```bash
npm start
```

The server will start on:

```text
http://localhost:8000
```

## API Endpoints

### Get all books

```http
GET /books
```

### Get a book by ID

```http
GET /books/:id
```

### Create a book

```http
POST /books
Content-Type: application/json
```

Example body:

```json
{
  "title": "New Book",
  "author": "Jane Doe"
}
```

### Delete a book

```http
DELETE /books/:id
```

## Notes

- This project uses an in-memory array, so data will be reset when the server restarts.
- Request logs are written to `logs.txt` by the logger middleware.
