const { bookTable } = require("../models/book.model");
const db = require("../db");
const { eq, ilike, sql } = require("drizzle-orm");
const { authorTable } = require("../models");

exports.getAllBooks = async function (req, res) {
  const search = req.query.search?.trim();
  if (search) {
    const books = await db
      .select()
      .from(bookTable)
      // .where(ilike(bookTable.title, `%${search}%`));
      .where(sql`to_tsvector('english', ${bookTable.title}) @@ to_tsquery('english', ${search})`);

    return res.json(books)
  }
  const books = await db.select().from(bookTable);
  return res.json(books);
};

exports.getBookById = async function (req, res) {
  const id = req.params.id;

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id))
    return res.status(400).json({ error: "Invalid id format (expected UUID)" });

  const [book] = await db
    .select()
    .from(bookTable)
    .where(eq(bookTable.id, id))
    .rightJoin(authorTable, eq(bookTable.authorId, authorTable.id))
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

  return res
    .status(201)
    .json({ message: "book created success", id: result.id });
};

exports.deleteBookById = async (req, res) => {
  const id = req.params.id;

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id))
    return res.status(400).json({ error: "Invalid id format (expected UUID)" });

  const [deleted] = await db
    .delete(bookTable)
    .where(eq(bookTable.id, id))
    .returning({ id: bookTable.id });

  if (!deleted)
    return res.status(404).json({ error: `book with id ${id} not found!` });

  return res.status(200).json({ message: "Book Deleted", id: deleted.id });
};
