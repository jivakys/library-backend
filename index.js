const express = require("express");
const { connection } = require("./config/mongoDB");
const { userRouter } = require("./routes/userRoute");
const { bookRouter } = require("./routes/bookRoute");
const { orderRouter } = require("./routes/orderRoute");
const app = express();
app.use(express.json());

app.use("/", (req, res) => {
  console.log("Masai Library Backend");
  res.send({ message: "Masai Library Backend" });
});
app.use("/api/user", userRouter);
app.use("api/books", bookRouter);
app.use("/api", orderRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Server Running on ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
