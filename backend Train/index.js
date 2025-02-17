const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = require("./router/userRouter");
const ProfileRouter = require("./router/tProfileRouter.js");
const train = require("./router/trainRouter.js");
const station = require("./router/stationRouter.js");
const timing = require("./router/timingRouter.js");
const compartment = require("./router/compartmentRouter.js");
const Contact = require("./router/contactRouter.js");
const booking = require("./router/bookingRouter.js");
const payment = require("./router/paymentRouter.js");

const { connectDB } = require("./config/DB.js");

connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "10000000" }));
app.use("/api", ProfileRouter);
app.use("/api", train);
app.use("/api", userRouter);
app.use("/api", timing);
app.use("/api", station);
app.use("/api", compartment);
app.use("/api", Contact);
app.use("/api", booking);
app.use("/api", payment);

app.listen(1998, () => {
  console.log("server running (1998)");
});
