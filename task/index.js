const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

// const testObj = {
//   name: "Test"
// }

// const { name: ime } = testObj;
// console.log('name', name);

const connectDB = require("./models/db/config");
connectDB();

const { getSection } = require("./models/config");
const {
  login,
  register,
  refreshToken,
  resetPassword,
} = require("./controllers/auth");

const { getAllCars, createCar, updateCar, deleteCar } = require("./controllers/cars");

const app = express();

app.use(express.json());
app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register", "/auth/reset", "/cars/:owner", "/cars"],
  })
);

app.get("/", (req, res) => res.send("Hello World"));
app.post("/auth/login", login);
app.post("/auth/register", register);
app.post("/auth/refresh", refreshToken);
app.post("/auth/reset", resetPassword);

app.get("/cars/:owner", getAllCars);
app.post("/cars", createCar);
app.put("/cars/:id", updateCar);
app.delete("/cars/:id", deleteCar);

app.listen(getSection("development").port, () =>
  console.log(`Server started at port ${getSection("development").port}!`)
);