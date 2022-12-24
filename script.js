const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb://localhost/mytest",
  () => {
    console.log("connected");
  },
  (error) => console.error(error)
);
