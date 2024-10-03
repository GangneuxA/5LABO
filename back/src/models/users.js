const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    apikey: {
      type: String,
      required: false,
      unique: false,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const users = mongoose.model("users", userSchema);

module.exports = {
  users,
};
