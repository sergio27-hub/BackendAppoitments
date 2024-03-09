import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creategoria: {
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
  imageUrls: {
    type: [String],
    required: true
  },
  createdBy: {
    type: String,
    enum: ['admin', 'superusuario'],
    required: true
  }
}, { timestamps: true , versionKey: false});

export default model('Product', productSchema);
