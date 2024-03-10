import { Service } from "../../models/index.js";

export async function getServices() {
  const services = await Service.find();
  return services;
}

export async function createService(service) {
  const serviceDoc = new Service(service);
  const createdService = await serviceDoc.save();
  return createdService;
}

export async function getServiceById(id) {
  const service = await Service.findById(id);
  return service;
}

export async function deleteServiceById(id) {
  const service = await Service.findByIdAndDelete(id);
  return service;
}

export async function updateServiceById(id, update) {
  const service = await Service.findByIdAndUpdate
  (id, update, { new: true });
  return service;
}

export async function getServicesByCategory(category) {
  const services = await Service.find
  ({ category : category });
  return services;
}

export async function getServiceByProviderAndName(provider, name) {
  const service = await Service.findOne({ provider, name });
  return service;
}


export async function updateServiceByName(name, update) {
  const service = await Service.findOneAndUpdate({ name }, update);
  return service;
}

export async function getServiceByName(name) {
  const service = await Service.findOne({ name });
  return service;
}

