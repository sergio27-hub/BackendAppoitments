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
import { getUserByName , getUserById  } from '../services/database/user-db-services.js';


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

  export async function getAppointmentByIdController(req, res, next) {
    try {
      const appointment = await getAppointmentById(req.params.id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      res.json(appointment);
    } catch (error) {
      next(error);
    }
  }

  export async function deleteAppointmentByIdController(req, res, next) {
    try {
      const appointment = await deleteAppointmentById(req.params.id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      res.json({ message: 'Appointment deleted' });
    } catch (error) {
      next(error);
    }
  }

  export async function updateAppointmentByIdController(req, res, next) {
    try {
      const { customerName, appointmentTime, service, user } = req.body;
      const {id} = req.params;

      if (!id) {
        return res.status(400).json({ message: 'Appointment ID is required' });
      }

      const foundUser = await getUserByName(user);
      if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      const foundService = await getServiceByName(service);
      if (!foundService) {
        return res.status(404).json({ message: 'Service not found' });
      }

      const appointment = await getAppointmentById(id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }

      const updatedAppointment = await updateAppointmentById(id, {
        customerName,
        appointmentTime,
        service: foundService._id,
        user: foundUser._id,
      });

      res.json(updatedAppointment);
    } catch (error) {
      next(error);
    }
  }

  export async function updateAppointmentByIdPatchController (req, res, next) {
    try {
      const {id} = req.params;
      const { customerName, appointmentTime, service, user } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'Appointment ID is required' });
      }

      const updatedAppointmentData = {};

      if (customerName) {
        updatedAppointmentData.customerName = customerName;
      }

      if (appointmentTime) {
        updatedAppointmentData.appointmentTime = appointmentTime;
      }

      if (service) {
        const foundService = await getServiceByName(service);
        if (!foundService) {
          return res.status(404).json({ message: 'Service not found' });
        }
        updatedAppointmentData.service = foundService._id;
      }

      if (user) {
        const foundUser = await getUserByName(user);
        if (!foundUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        updatedAppointmentData.user = foundUser._id;
      }

      const updatedAppointment = await updateAppointmentById(id, updatedAppointmentData);
      if (!updatedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      res.json(updatedAppointment);
    } catch (error) {
      next(error);
    }
  }

  export async function getAppointmentsByUserController(req, res, next) {
    try {
      const { user } = req.params;
      const foundUser = await getUserByName(user);
      if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      const appointments = await getAppointmentsByUser(foundUser._id);
      if (appointments.length === 0) {
        return res.status(404).json({ message: 'No appointments found' });
      }

      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }

  export async function getAppointmentsByUserIdController(req, res, next) {
    try {
      const { id } = req.params;
      const foundUser = await getUserById(id);
      if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      const appointments = await getAppointmentsByUser(id);
      if (appointments.length === 0) {
        return res.status(404).json({ message: 'No appointments found' });
      }
      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }

