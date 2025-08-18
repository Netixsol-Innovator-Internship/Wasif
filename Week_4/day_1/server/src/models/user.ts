import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

// 1️⃣ Define a TypeScript interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// 2️⃣ Define the Mongoose schema
const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: { type: String, required: true, minlength: 6 },
});

// 3️⃣ Pre-save hook to hash password
userSchema.pre<IUser>("save", async function (next) {
  // Only hash if password is modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 4️⃣ Optional: instance method to compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// 5️⃣ Export the model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
