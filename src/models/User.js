import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: [{
    ref: 'Role',
    type: Schema.Types.ObjectId
  }]
}, { timestamps: true });

export default model('User', userSchema);
