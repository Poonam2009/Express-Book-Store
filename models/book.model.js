const { pgTable, uuid, varchar, text, index } = require("drizzle-orm/pg-core")
const {sql} = require('drizzle-orm')
const { authorTable } = require("./author.model")

const bookTable = pgTable("book", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    authorId: uuid().references(() => authorTable.id).notNull(),
}, (table) => ({
    // searchIndexOnTitle: index("search_index_on_title").on(table.title),
    searchIndexOnTitle: index('title_search_index').using('gin', sql`to_tsvector('english', ${table.title})`),
}))

module.exports = {
    bookTable,
}