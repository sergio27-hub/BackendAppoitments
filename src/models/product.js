import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdBy: {
    type: String,
    enum: ['admin', 'root'],
    required: true
  }
}, { timestamps: true });

export default model('Product', productSchema);
