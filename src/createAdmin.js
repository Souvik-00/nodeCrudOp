require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        const existing = await User.findOne({email: "admin@example.com"});
        if(existing) {
            console.log("Admin already exists");
            process.exit(0);
        }

        const user = new User({
            name: "Admin",
            email: "admin@example.com",
            password: "admin123",
        });
        await user.save();
        console.log("Admin user created: admin@example.com / admin123");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(0);
    }
}

createAdmin();