const express = require('express');
const router = express.Router();
const controller = require('../controllers/book.controller')

// function customMiddleware(req, res, next) {
//     console.log('I am custom middleware');
//     next();
// }

// router.get('/', (req, res) => {
//     // res.setHeader('x-piy', 'poonam rawat') // for custom headers
//     res.json(BOOKS);
// });

router.get('/', controller.getAllBooks);

// router.get('/:id', (req, res) => {
//     // const id = req.params.id;
//     const id = parseInt(req.params.id)
//     if(isNaN(id)) return res.status(400).json({error: 'id must be of type number'})
//     const book = BOOKS.find((e) => e.id == id)
//     if(!book) return res.status(404).json({error: `book with id ${id} not found!`})
//     return res.json(book);
// })

router.get('/:id', controller.getBookById)

// router.post('/', (req, res) => {
//     console.log('Parsed body:', req.body);
//     const {title, author} = req.body
//     if(!title || title === "") return res.status(400).json({error: 'Bad request, Title is required'})

//     if(!author || author === "") return res.status(400).json({error: 'Bad request, Author is required'})
    
//     const id = BOOKS .length + 1;
//     const book = {id, title, author}
//     BOOKS.push(book)
//     return res.status(201).json({message: `book created success Id : ${id}`})
//     // return res.status(201).json({ receivedData: req.body });
// })

router.post('/', controller.createBook);

// router.delete('/:id', (req, res) => {

//     const id = parseInt(req.params.id)
//     if(isNaN(id)) return res.status(400).json({error: 'id must be of type number'})
    
//     const indexToDelete = BOOKS.findIndex(e => e.id === id)
//     if(indexToDelete < 0) return res
//     .status(404)
//     .json({error: `book with id ${id} not found!`})

//     BOOKS.splice(indexToDelete, 1);

//     return res.status(200).json({message: 'Book Deleted'})

// })

router.delete('/:id', controller.deleteBookById) 

module.exports = router;