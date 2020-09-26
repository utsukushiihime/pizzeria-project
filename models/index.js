const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://admin:n6QHsp438V4f8gK@planet-pizzeria.rauho.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
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

// mongoose.connect(
//   process.env.MONGODB_URI ||
//     "mongodb+srv://admin:n6QHsp438V4f8gK@planet-pizzeria.rauho.mongodb.net/<dbname>?retryWrites=true&w=majority"
// );

module.exports = {
  User: require("./User"),
  Order: require("./Order"),
};
