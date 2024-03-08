import * as appointmentService from '../services/database/appointment-db-services.js';

export async function getAppointments(req, res) {
  try {
    const appointments = await appointmentService.getAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createAppointment(req, res) {
  const appointmentData = req.body;

  try {
    const createdAppointment = await appointmentService.createAppointment(appointmentData);
    res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
