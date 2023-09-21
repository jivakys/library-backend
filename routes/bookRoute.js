const express = require("express");
const {
  bookRegistration,
  allBooksData,
  updateBook,
  deleteBook,
  filderData,
} = require("../controllers/book.controllers");
const { auth } = require("../middleware/auth");

const bookRouter = express.Router();

bookRouter.get("/", allBooksData);
bookRouter.get("/:id", allBooksData);
bookRouter.get("/author=corey&category=fiction", filderData);
bookRouter.post("/", auth, bookRegistration);
bookRouter.patch("/:id", auth, updateBook);
bookRouter.delete("/:id", auth, deleteBook);

module.exports = { bookRouter };
