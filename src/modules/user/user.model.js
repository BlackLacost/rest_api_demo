const { Schema, model } = require("mongoose");
const { genSalt, hash } = require("bcryptjs");

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    genSalt(10).then(salt => {
      hash(this.password, salt).then(hash => {
        this.password = hash;
        next();
      });
    });
  }
});

module.exports = model("users", userSchema);
