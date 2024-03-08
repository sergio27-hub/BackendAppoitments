import Appointment from '../../models/index.js';

export async function getAppointments() {
  const appointments = await Appointment.find();
  return appointments;
}

export async function createAppointment(appointment) {
  const appointmentDoc = new Appointment(appointment);
  const createdAppointment = await appointmentDoc.save();
  return createdAppointment;
}
