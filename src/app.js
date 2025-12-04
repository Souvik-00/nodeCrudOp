require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI);
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const {ensureAuth} = require("./middleware/authMIddleware");

const connectDB = require("./config/db");
connectDB();

const app = express();

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "..", "public")));


// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            ttl: 14 * 24 * 60 * 60,   // 14 days
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 // 1 hour
        }
    })
);

// Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Routes
app.use("/", require("./routes/authRoutes"));

app.use("/categories", require("./routes/categoryRoutes"));
app.use("/subcategories", require("./routes/subcategoryRoutes"));
app.use("/products", require("./routes/productRoutes"));

module.exports = app;