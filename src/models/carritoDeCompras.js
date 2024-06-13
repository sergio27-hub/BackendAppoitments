import mongoose from "mongoose";

const { Schema, model } = mongoose;

const carritoDeComprasSchema = new Schema({

  product : {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quantity : {
    type: Number,
    required: true
  }
},{ timestamps: true });


export default model('CarritoDeCompras', carritoDeComprasSchema);
