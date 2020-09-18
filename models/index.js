const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/pizzeria";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("Mongodb connected...");
  })
  .catch((error) => {
    console.log("Mongodb connection err", error);
  });

mongoose.connection.on("disconnect", (event) => {
  console.log("mongodb disconnected", event);
});

module.exports = {
  User: require("./User"),
};
