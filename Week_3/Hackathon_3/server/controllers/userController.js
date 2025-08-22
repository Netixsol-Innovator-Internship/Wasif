const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "superAdmin") {
      return res
        .status(403)
        .json({ message: "Only SuperAdmins can delete users" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin", "superAdmin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (req.user.role !== "superAdmin") {
      return res
        .status(403)
        .json({ message: "Only SuperAdmins can change roles" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Role updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// ✅ Block user
exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "superAdmin") {
      return res
        .status(403)
        .json({ message: "Only SuperAdmins can block users" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User blocked successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Unblock user
exports.unblockUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "superAdmin") {
      return res
        .status(403)
        .json({ message: "Only SuperAdmins can unblock users" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User unblocked successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
