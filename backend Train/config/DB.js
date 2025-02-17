const mongoose = require("mongoose");
exports.connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://srdonald111:admin@cluster0.a4rfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log(" DB connected ");
    })
    .catch((err) => {
      console.log("error:", err);
    });
};
