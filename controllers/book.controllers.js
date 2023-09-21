const { bookModel } = require("../model/bookModel");

const allBooksData = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).send({ message: "All Books Data Fetched", books });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};

const singleBooksData = async (req, res) => {
  const bookId = req.params.id;
  try {
    const oneBook = await bookModel.findById(bookId);
    res.status(200).send({ message: "Single Book Data Fetched", oneBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};

const bookRegistration = async (req, res) => {
  const payload = req.body;
  try {
    const newBook = new bookModel(payload);
    await newBook.save();
    res.status(200).send({ message: "New Book Added", newBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};

const filderData = async (req, res) => {
  try {
    const { category, author } = req.query;
    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (author) {
      filter.author = author;
    }
    const books = await bookModel.find(filter);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};

const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const payload = req.body;
  try {
    const updatedBook = await bookModel.findByIdAndUpdate(bookId, payload, {
      new: true,
    });
    res.status(204).send({ message: "Book Details Updated", updatedBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};

const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const deleteBook = await bookModel.findByIdAndDelete(bookId);
    res.status(204).send({ message: "Book Details Deleted", deleteBook });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some server Error", error });
  }
};

module.exports = {
  allBooksData,
  singleBooksData,
  filderData,
  bookRegistration,
  updateBook,
  deleteBook,
};
