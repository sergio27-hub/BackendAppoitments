import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'proveedor', 'usuario', 'usuarioLogueado'],
    default: 'superusuario'
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

export default model('User', userSchema);
