require('dotenv/config')
const express = require('express');
const bookDb = require('./models/book')
const bookRouter = require('./routes/book.routes')
const authorRouter = require('./routes/author.routes')
const {loggerMiddleware} = require('./middlewares/logger')


const app = express();
const PORT = process.env.PORT || 8000;

// in-memory database
// const books = [
//     {
//         id: 1,
//         title: 'Book One',
//         author: 'Author one'
//     },
//     {
//         id: 2,
//         title: 'Book two',
//         author: 'Author two'
//     }
// ];

// function loggerMiddleware(req, res, next){
//     const log = `\n[${Date.now()}] ${req.method} ${req.path}`
//     fs.appendFileSync ('logs.txt', log, 'utf-8');
//     next();

// }

function customMiddleware(req,res, next){
    console.log('I am custom Middleware')
    next()
}

//Middlewares (plugins)
app.use(express.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            error: 'Invalid JSON payload. Please send valid JSON.',
            details: err.message,
        });
    }
    next(err);
});
app.use(loggerMiddleware)
// app.use(function(req, res, next){
//     const log = `\n[${Date.now()}] ${req.method} ${req.path}`
//     fs.appendFileSync ('logs.txt', log, 'utf-8');
//     next();

// })
// app.use(function(req, res, next){
//     console.log("I am a Middleware A")
//     // return res.json({message: "Boom! I am a Middleware A"})
//     next();
// })

// app.use(function(req, res, next){
//     console.log("I am a Middleware B")
//     return res.json({message: "Boom! I am a Middleware B"})
//     // next();
// })


// Routes
// Register book and author endpoints
app.use('/books',  bookRouter)
app.use('/authors',  authorRouter)

// app.get('/books', (req, res) => {
//     // res.setHeader('x-piy', 'poonam rawat') // for custom headers
//     res.json(books);
// });

// app.get('/books/:id', customMiddleware, (req, res) => {
//     // const id = req.params.id;
//     const id = parseInt(req.params.id)
//     if(isNaN(id)) return res.status(400).json({error: 'id must be of type number'})
//     const book = books.find((e) => e.id == id)
//     if(!book) return res.status(404).json({error: `book with id ${id} not found!`})
//     return res.json(book);
// })

// app.post('/books', (req, res) => {
//     console.log('Parsed body:', req.body);
//     const {title, author} = req.body
//     if(!title || title === "") return res.status(400).json({error: 'Bad request, Title is required'})

//     if(!author || author === "") return res.status(400).json({error: 'Bad request, Author is required'})
    
//     const id = books.length + 1;
//     const book = {id, title, author}
//     books.push(book)
//     return res.status(201).json({message: `book created success Id : ${id}`})
//     // return res.status(201).json({ receivedData: req.body });
// })

// app.delete('/books/:id', (req, res) => {

//     const id = parseInt(req.params.id)
//     if(isNaN(id)) return res.status(400).json({error: 'id must be of type number'})
    
//     const indexToDelete = books.findIndex(e => e.id === id)
//     if(indexToDelete < 0) return res
//     .status(404)
//     .json({error: `book with id ${id} not found!`})

//     books.splice(indexToDelete, 1);

//     return res.status(200).json({message: 'Book Deleted'})

// })

app.listen(PORT, () => {
    console.log(`Http Server is running on Port: ${PORT}`);
});