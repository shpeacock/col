let mongoose = require('mongoose');

let AnswerSchema = new mongoose.Schema({
  answer:{
    type : String,
    required:[true, 'answer cannot be blank'],
    maxlength:[140, 'answer cannot be more than 140 charachters']
  },
  details:{
    type: String
  },
  likes: {
    type:Number,
    default:0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }
}, {timestamps: true});

mongoose.model("Answer", AnswerSchema);