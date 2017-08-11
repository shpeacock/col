let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Name cannot be blank!']
  },
  questions:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  answers:[{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}]
}, {timestamps:true})
mongoose.model("User", UserSchema)