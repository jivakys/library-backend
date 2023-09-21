const express = require("express");
const {
  bookRegistration,
  allBooksData,
  updateBook,
  deleteBook,
} = require("../controllers/book.controllers");

const bookRouter = express.Router();

bookRouter.get("/", allBooksData);
bookRouter.get("/:id", allBooksData);
bookRouter.post("/", bookRegistration);
bookRouter.patch("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);

module.exports = { bookRouter };
