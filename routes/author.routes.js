const express = require('express');
const controller = require('../controllers/author.controller')

const router = express.Router();

router.get('/', controller.getAllAuthor )
router.get('/:id', controller.getAuthorById)
router.post('/', controller.createAuthor);
router.get('/:id/books', controller.getAllTheBooksByAuthor)

module.exports = router;