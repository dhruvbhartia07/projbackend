const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');
let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}


const userSchema = new Schema({
  name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
  },
  lastname: {
    type: String,
    required: false,
    maxlength: 32,
    trim: true
  },
  email: {
      type: String,
      required: true,
      unique: true,
      trim: true
  },
  userinfo: {
      type: String,
      trim: true
  },
  encry_password: {
      type: String,
      required: true
  },
  salt: String,
  role: {
      type: Number,
      default: 0
  },
  purchases: {
      type: Array,
      default: []
  }
}, {timestamps: true});

userSchema.virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    })


userSchema.methods = {

    authenticate: function(plainPassword) {
        return this.securePassword(plainPassword) === this.encry_password;
    },

    securePassword: function(plainPassword) {
        if(!plainPassword) return "";
        try {
            return crypto
                .createHmac('sha256', this.salt)
                .update(plainPassword)
                .digest('hex');
        } catch(err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);