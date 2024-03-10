import {   getAppointments,
  createAppointment,
  getAppointmentByProviderAndTime,
  getAppointmentById,
  deleteAppointmentById,
  updateAppointmentById,
  getAppointmentsByService,
  getAppointmentsByUser,
  getAppointmentsByProvider,
  getAppointmentsByCustomer } from '../services/database/appointment-db-services.js';
import { getServiceByName } from '../services/database/services-db-services.js';
import { getUserByName } from '../services/database/user-db-services.js';


export async function getAppointmentsController(req, res) {
    try {
      const appointments = await getAppointments();
      if (appointments.length === 0) {
        return res.status(404).json({ message: 'No appointments found' });
      }
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  export async function createAppointmentController(req, res, next) {
    const { customerName, appointmentTime, service, user } = req.body;

    try {
      // Verificar si el usuario y el servicio existen
      const foundUser = await getUserByName(user);
      if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      const foundService = await getServiceByName(service);
      if (!foundService) {
        return res.status(404).json({ message: 'Service not found' });
      }

      // Verificar si ya existe una cita para el mismo proveedor a la misma hora
      const existingAppointment = await getAppointmentByProviderAndTime(foundService.provider, appointmentTime);
      if (existingAppointment) {
        return res.status(409).json({ message: 'Appointment already exists for this provider at the specified time' });
      }

      // Crear la cita
      const appointmentData = {
        customerName,
        appointmentTime,
        service: foundService._id,
        user: foundUser._id,
      };

      const createdAppointment = await createAppointment(appointmentData);

      res.status(201).json(createdAppointment);
    } catch (error) {
      next(error);
    }
  }
