
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
      type: String,
      required: 'This field is required.'
  },
  email: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  gender: {
    type: String,
  },
  is_deleted: {
      type: Boolean,
      default: false
  },
  modification_notes: []
},
{
  timestamps: true
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

module.exports = mongoose.model('users', userSchema);
