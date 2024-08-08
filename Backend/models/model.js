const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/Authentication_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database Connected!');
});

const expenses=new Schema({
  amount: {
    type: Number,
    default:0,
    required: true
  },
  is_expense:{
    type: Boolean,
    default:true,
    required: true
  },
  catagory: {
    type: String,
    enum: ['food', 'transport', 'entertainment', 'utilities','bills','clothing', 'other'],validate: {
      validator: function (v) {
          return this.is_expense ? v != null : true;
      },
      message: props => `Category is required when description is provided.`
        }
  },description: {
    type: String,
    default: "Miscellaneous"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  current_funds: {
    type: Number,
    default: 0
  }
  ,
  expenditure_list:{
    type:[expenses],
    default:[]
  },
  role: {
    type: String,
    default: "NORMAL",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('Custom_User', userSchema)


module.exports = User;
