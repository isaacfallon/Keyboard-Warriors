const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

let moment = require('moment'); // require
let now = moment().format('MMMM Do YYYY, h:mm:ss a');

const scoreSchema = new Schema({
  wordCount: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  letterCount: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  scoreAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: String,
    default: now,
    // get: (timestamp) => dateFormat(timestamp),
  },
});

const Score = model('score', scoreSchema);

module.exports = Score;
