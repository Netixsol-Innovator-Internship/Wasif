// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
//   },
//   password: { type: String, required: true, minlength: 6 },
// });
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("Password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// module.exports = mongoose.model("User", userSchema);
