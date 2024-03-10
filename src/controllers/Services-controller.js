import { HttpStatusError } from 'common-errors';
import { getServiceById , getServiceByName, getServiceByProviderAndName , getServices , createService , getServicesByCategory , deleteServiceById , updateServiceById , updateServiceByName} from '../services/database/services-db-services.js';
import { getUserByName } from '../services/database/user-db-services.js';


export async function createServiceController(req, res, next) {
  try {
    const { name, description, price, category, provider } = req.body;

    // Verificar si se proporcionó un proveedor
    if (!provider) {
      return res.status(400).json({ message: 'Provider is required' });
    }

    // Buscar al proveedor por su nombre
    const foundProvider = await getUserByName(provider);

    // Verificar si se encontró al proveedor
    if (!foundProvider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    // Verificar si el proveedor ya tiene un servicio con el mismo nombre
    const existingService = await getServiceByProviderAndName(foundProvider._id, name);

    // Si el proveedor ya tiene un servicio con el mismo nombre, devolver un error
    if (existingService) {
      return res.status(409).json({ message: 'Service with the same name already exists for this provider' });
    }

    // Crear el nuevo servicio
    const newService = await createService({
      name,
      description,
      price,
      category,
      provider: foundProvider._id,
    });

    // Guardar el servicio en la base de datos
    const savedService = await newService.save();

    // Devolver el servicio creado
    res.status(201).json(savedService);
  } catch (error) {
    next(error);
  }
}


export async function getServicesController(req, res, next) {
  try {
    const services = await getServices();

    if (services.length === 0) {
      throw new HttpStatusError(404, 'Services not found');
    }

    res.json(services);
  } catch (error) {
    next(error);
  }
}


export async function getServiceByIdController(req, res, next) {
  try {
    const service = await getServiceById(req.params.id);
    console.log(service);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    next(error);
  }
}

export async function deleteServiceByIdController(req, res, next) {
  try {
    const service = await deleteServiceById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
}

export async function updateServiceByIdController(req, res, next) {
  try {
    const { name, description, price, category, provider } = req.body;
    const id = req.params.id;

    if (!id) {
      // Si no se proporciona un ID, se trata de una creación de servicio

      // Buscar al proveedor por su nombre
      const foundProvider = await getUserByName(provider);
      if (!foundProvider) {
        return res.status(404).json({ message: 'Provider not found' });
      }

      // Verificar si el proveedor ya tiene un servicio con el mismo nombre
      const existingService = await getServiceByProviderAndName(foundProvider._id, name);
      // Si el proveedor ya tiene un servicio con el mismo nombre, devolver un error
      if (existingService) {
        return res.status(409).json({ message: 'Service with the same name already exists for this provider' });
      }

      // Crear un nuevo servicio utilizando el ID del proveedor encontrado
      const newService = await createService({
        name,
        description,
        price,
        category,
        provider: foundProvider._id,
      });

      const savedService = await newService.save();
      return res.status(201).json(savedService);
    } else {
      // Si se proporciona un ID, se trata de una actualización de servicio
      const service = await getServiceById(id);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      // Buscar al proveedor por su nombre
      const foundProvider = await getUserByName(provider);
      if (!foundProvider) {
        return res.status(404).json({ message: 'Provider not found' });
      }

      // Verificar si el proveedor ya tiene un servicio con el mismo nombre
      const existingService = await getServiceByProviderAndName(foundProvider._id, name);
      // Si el proveedor ya tiene un servicio con el mismo nombre y es diferente al servicio actual, devolver un error
      if (existingService && existingService._id.toString() !== id) {
        return res.status(409).json({ message: 'Service with the same name already exists for this provider' });
      }

      // Actualizar el servicio con el ID del proveedor encontrado
      const updatedService = await updateServiceById(id, {
        name,
        description,
        price,
        category,
        provider: foundProvider._id,
      });

      return res.json(updatedService);
    }
  } catch (error) {
    next(error);
  }
}



export async function updateServiceByIdPatchController(req, res, next) {
  try {
    const id = req.params.id;
    const { name, description, price, category, provider } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Service ID is required' });
    }

    const updatedServiceData = {};

    if (name) {
      updatedServiceData.name = name;
    }

    if (description) {
      updatedServiceData.description = description;
    }

    if (price) {
      updatedServiceData.price = price;
    }

    if (category) {
      updatedServiceData.category = category;
    }

    if (provider) {
      const foundProvider = await getUserByName(provider);
      if (!foundProvider) {
        return res.status(404).json({ message: 'Provider not found' });
      }
      updatedServiceData.provider = foundProvider._id;
    }

    const updatedService = await updateServiceById(id, updatedServiceData);
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(updatedService);
  } catch (error) {
    next(error);
  }
}


export async function updateServiceByNameController(req, res, next) {
  try {
    const service = await updateServiceByName(req.params.name, req.body);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    next(error);
  }
}

export async function getServicesByCategoryController(req, res, next) {
  try {
    const services = await getServicesByCategory(req.params.category);
    res.json(services);
  } catch (error) {
    next(error);
  }
}

export async function getServiceByNameController(req, res, next) {
  try {
    const service = await getServiceByName(req.params.name);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    next(error);
  }
}



