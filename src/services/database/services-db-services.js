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
