import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const appointmentSchema = new Schema({
  customerName: {
    type: String,
    required: true
  },
  appointmentTime: {
    type: Date,
    required: true
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export default model('Appointment', appointmentSchema);
