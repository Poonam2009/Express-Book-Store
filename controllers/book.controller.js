const { bookTable } = require("../models/book.model");
const db = require("../db");
const { eq } = require("drizzle-orm");

exports.getAllBooks = async function (req, res) {
  const books = await db.select().from(bookTable);
  return res.json(books);
};

exports.getBookById = async function (req, res) {
  const id = req.params.id;

  const [book] = await db
    .select()
    .from(bookTable)
    .where((table) => eq(table.id, id))
    .limit(1);

  if (!book)
    return res.status(404).json({ error: `book with id ${id} not found!` });
  return res.json(book);
};

exports.createBook = async function (req, res) {
  const { title, description, authorId } = req.body;
  if (!title || title === "")
    return res.status(400).json({ error: "Bad request, Title is required" });

  const [result] = await db
    .insert(bookTable)
    .values({
      title,
      description,
      authorId,
    })
    .returning({
      id: bookTable.id,
    });

  return res.status(201).json({ message: "book created success", id: result.id });
};

exports.deleteBookById = async (req, res) => {
  const id = req.params.id;

  await db.delete(bookTable).where(eq(bookTable.id, id));

  return res.status(200).json({ message: "Book Deleted" });
};
