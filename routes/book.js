var express = require('express');
var router = express.Router();
const Book = require('../models/book.model');
/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.render('book/index', { books });
  } catch (err) {
    console.log(err);
  }

});
// CREATE Book
router.get('/create', (req, res) => {
  res.render('book/create');
});
router.post('/create', async (req, res) => {
  let book = new Book(req.body);
  try {
    await book.save();
    res.redirect("/book");
  } catch (err) {
    throw err
  }
});
// UPDATE Book

router.get('/update/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('book/update', { book });
  } catch (err) {
    throw err
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/book");
  } catch (err) {
    throw err
  }
});

//DELETE Book

router.get('/delete/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/book");
  } catch (err) {
    throw err
  }
});

module.exports = router;
