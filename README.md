# Express Book Store

A simple Express.js application for managing authors and books using PostgreSQL with Drizzle ORM.

## Features

- Get all authors
- Get an author by ID
- Create a new author
- Get all books by author
- Get all books
- Get a book by ID
- Create a new book
- Delete a book by ID
- Request logging middleware
- JSON validation error handling

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Drizzle ORM
- Drizzle Kit

## Project Structure

- `index.js` - Main server entry point
- `routes/` - Route definitions for books and authors
- `controllers/` - Request handlers for author and book logic
- `models/` - Drizzle table schemas
- `db/` - Database connection setup
- `middlewares/` - Custom middleware
- `drizzle.config.js` - Drizzle configuration
- `logs.txt` - Request logs

## Installation

```bash
npm install
```

Create a `.env` file in the project root with your PostgreSQL connection string:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/your_database
PORT=8000
```

## Generate / Push Database Schema

```bash
npx drizzle-kit generate
npx drizzle-kit push
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

### Authors

#### Get all authors

```http
GET /authors
```

#### Get an author by ID

```http
GET /authors/:id
```

#### Create an author

```http
POST /authors
Content-Type: application/json
```

Example body:

```json
{
  "firstName": "Poonam",
  "lastName": "Rawat",
  "email": "poonam@example.com"
}
```

#### Get all books by author

```http
GET /authors/:id/books
```

### Books

#### Get all books

```http
GET /books
```

#### Search books

```http
GET /books?search=javascript
```

#### Get a book by ID

```http
GET /books/:id
```

#### Create a book

```http
POST /books
Content-Type: application/json
```

Example body:

```json
{
  "title": "Clean Code",
  "description": "A handbook of agile software craftsmanship",
  "authorId": "<author-uuid>"
}
```

#### Delete a book by ID

```http
DELETE /books/:id
```

## Notes

- The project uses PostgreSQL and Drizzle ORM instead of the old in-memory store.
- Book records are linked to authors via the `authorId` field.
- Request logs are written to `logs.txt` by the logger middleware.
- Invalid JSON payloads return a clean `400` response with an error message.
