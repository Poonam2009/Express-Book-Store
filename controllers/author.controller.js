const { eq } = require('drizzle-orm');
const { authorTable } = require('../models/author.model');
const db = require('../db');
const { bookTable } = require('../models/book.model');

exports.getAllAuthor = async function (req, res) {
  const author = await db.select().from(authorTable);
  return res.json(author);
};

exports.getAuthorById = async function (req, res) {
  const id = req.params.id;

  const [author] = await db
    .select()
    .from(authorTable)
    .where(eq(authorTable.id, id))
    .limit(1);

  if (!author)
    return res.status(404).json({ error: `author with id ${id} not found!` });

  return res.json(author);
};

exports.createAuthor = async function (req, res) {
  const { firstName, lastName, email } = req.body;

  if (!firstName || firstName === "")
    return res.status(400).json({ error: "Bad request, FirstName is required" });

    const [result] = await db.insert(authorTable).values({
        firstName,
        lastName,
        email
    }).returning({
        id: authorTable.id,
    })

  return res.status(201).json({ message: "Author created success", Id :result.id });
};

exports.getAllTheBooksByAuthor = async (req, res) => {
  const authorId = req.params.id;

  const books = await db
    .select()
    .from(bookTable)
    .where(eq(bookTable.authorId, authorId));

  return res.json(books);
};

exports.getAllTheBooksByAuthor = async (req, res) => {
  const authorId = req.params.id;

  const books = await db
    .select()
    .from(bookTable)
    .where(eq(bookTable.authorId, authorId));

  return res.json(books);
};

// exports.deleteAuthorById = async (req, res) => {
//   const id = req.params.id;

//   await db.delete(authorTable).where(eq(authorTable.id, id))

//   return res.status(200).json({ message: "Author Deleted" });
// };
