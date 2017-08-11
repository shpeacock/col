let mongoose = require('mongoose');

let QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'please submit a question'],
    minlength: [6, 'question needs to be at least 6 charachters '],
    maxlength:[140, 'question cannot be more than 140 charachters']
  },
  description:{
    type:String,
    maxlength:[140, 'description cannot be more than 140 charachters']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }]
},
{timestamps:true})

mongoose.model('Question', QuestionSchema);