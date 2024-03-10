import Appointment from '../../models/appointment.js';

export async function getAppointments() {
  const appointments = await Appointment.find();
  return appointments;
}

export async function createAppointment(appointment) {
  const appointmentDoc = new Appointment(appointment);
  const createdAppointment = await appointmentDoc.save();
  return createdAppointment;
}


export async function getAppointmentById(id) {
  const appointment = await Appointment.findById(id);
  return appointment;
}

export async function deleteAppointmentById(id) {
  const appointment = await Appointment.findByIdAndDelete(id);
  return appointment;
}

export async function updateAppointmentById(id, update) {
  const appointment = await Appointment.findByIdAndUpdate(id, update);
  return appointment;
}

export async function getAppointmentsByService(service) {
  const appointments = await Appointment.find({ service });
  return appointments;
}

export async function getAppointmentsByUser(user) {
  const appointments = await Appointment.find({ user });
  return appointments;
}

export async function getAppointmentsByProvider(provider) {
  const appointments = await Appointment.find({ provider });
  return appointments;
}

export async function getAppointmentsByCustomer(customerName) {
  const appointments = await Appointment.find({ customerName });
  return appointments;
}

export async function getAppointmentByProviderAndTime(provider, time) {
  const appointment = await Appointment.findOne({ provider, time });
  return appointment;
}

