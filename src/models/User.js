const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true //hashed password
    },
}, {timestamps: true});


// hash password before save if possible
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// helper method to compare password
userSchema.method.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}


module.exports = mongoose.model("User", userSchema);