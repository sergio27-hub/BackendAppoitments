import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const serviceSchema = new Schema({
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
  provider: {
    type: Schema.Types.ObjectId, // Tipo ObjectId para referenciar al proveedor
    ref: 'Provider', // Nombre del modelo del proveedor
    required: true
  }
},{ timestamps: true });

export default model('Service', serviceSchema);
