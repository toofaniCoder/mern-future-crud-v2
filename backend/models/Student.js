const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // trim: true,
    required: [true, 'Please enter your first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name'],
  },
  country: {
    type: String,
    required: [true, 'Please enter your counrty name'],
  },
  state: {
    type: String,
    required: [true, 'Please enter your state name'],
  },
  city: {
    type: String,
    required: [true, 'Please enter your city name'],
  },
  pincode: {
    type: String,
    required: [true, 'Please enter your pincode number'],
  },
  profile: {
    type: String,
    default: 'no_name.jpg',
    // required: [true, 'please upload your profile picture'],
  },
  gender: {
    type: String,
    required: [true, 'please select your gender'],
    enumValues: ['male', 'female', 'other'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

StudentSchema.pre('findOneAndUpdate', function (next) {
  this.options.runValidators = true;
  next();
});
module.exports = mongoose.model('Student', StudentSchema);
