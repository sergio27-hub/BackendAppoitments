import * as serviceService from '../services/database/services-db-services.js';

export async function getServices(req, res) {
  try {
    const services = await serviceService.getServices();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createService(req, res) {
  const serviceData = req.body;

  try {
    const createdService = await serviceService.createService(serviceData);
    res.status(201).json(createdService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
