import { HttpStatusError } from 'common-errors';
import fs from 'fs';
import path from 'path';
import {
  getServiceById,
  getServiceByName,
  getServiceByProviderAndName,
  getServices,
  createService,
  getServicesByCategory,
  deleteServiceById,
  updateServiceById,
  updateServiceByName
} from '../services/database/services-db-services.js';
import { getUserByName } from '../services/database/user-db-services.js';
import { paginationItems } from '../utils/pagination.js';
import { uploadServices } from '../middlewares/ServicesUpload-middleware.js';

export async function createServiceController(req, res, next) {
  uploadServices(req, res, async (err) => {
    if (err) {
      return next(new HttpStatusError(500, `Error uploading files: ${err.message}`));
    }

    try {
      const services = Array.isArray(req.body) ? req.body : [req.body];
      const createdServices = [];
      console.log('Services:', services);
      console.log('Files:', req.files);

      if (!req.files || req.files.length === 0) {
        throw new HttpStatusError(400, 'At least one image is required');
      }

      for (const service of services) {
        const trimmedService = {};
        for (const key in service) {
          if (Object.hasOwnProperty.call(service, key)) {
            trimmedService[key.trim()] = service[key];
          }
        }

        const { name, description, price, category, provider } = trimmedService;

        if (!name || !description || !price || !category || !provider) {
          throw new HttpStatusError(400, 'All fields (name, description, price, category, provider) are required');
        }

        const foundProvider = await getUserByName(provider);
        if (!foundProvider) {
          throw new HttpStatusError(404, `Provider '${provider}' not found`);
        }

        const existingService = await getServiceByProviderAndName(foundProvider._id, name);
        if (existingService) {
          throw new HttpStatusError(409, `Service '${name}' already exists for provider '${provider}'`);
        }

        const imageUrls = req.files.map(file => file.path.replace('public/', '').replace(/\\/g, '/'));

        const newService = {
          name,
          imageURL: `/services/${name}/${imageUrls[0].split('/').pop()}`,
          imageUrls: imageUrls.map(url => `/services/${name}/${url.split('/').pop()}`),
          description,
          price,
          category,
          provider: foundProvider._id,
        };

        const savedService = await createService(newService);
        createdServices.push(savedService);
      }

      res.status(201).json(createdServices);
    } catch (error) {
      console.error('Error creating service:', error);
      next(new HttpStatusError(error.status || 500, error.message));
    }
  });
}

export async function deleteServiceByIdController(req, res, next) {
  try {
    const { id } = req.params;

    if (!id || id === 'null') {
      return res.status(400).json({ message: 'Invalid service ID' });
    }

    const service = await getServiceById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await deleteImages(id);

    await deleteServiceById(id);
    res.json({
      message: 'Service deleted',
      deletedImages: service.imageUrls
    });
  } catch (error) {
    next(error);
  }
}

const deleteImages = async (id) => {
  const user = await getServiceById(id);
  if (user && user.imageUrls && user.imageUrls.length > 0) {
    user.imageUrls.forEach(imageUrl => {
      const imgPath = path.resolve(`./public/${imageUrl.replace(/\\/g, '/')}`);
      try {
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
          console.log(`Image ${imgPath} deleted`);
        } else {
          console.warn(`Image not found: ${imgPath}`);
        }
      } catch (error) {
        console.error(`Error deleting image ${imgPath}: ${error.message}`);
      }
    });
  } else {
    console.warn(`No images found for service ID ${id}`);
    }
    };


export async function getServicesController(req, res, next) {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const items = await getServices(offset, limit);

    if (items.values.length === 0) {
      throw new HttpStatusError(404, 'Services not found');
    }

    const paginatedResult = paginationItems(req, items);

    res.json(paginatedResult);
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


export async function updateServiceByIdController(req, res, next) {
  uploadServices(req, res, async (err) => {
    if (err) {
      return next(new HttpStatusError(500, `Error uploading files: ${err.message}`));
    }

    try {
      const { id } = req.params;
      const { name, description, price, category, provider } = req.body;

      const service = await getServiceById(id);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      const foundProvider = await getUserByName(provider);
      if (!foundProvider) {
        return res.status(404).json({ message: 'Provider not found' });
      }

      const existingService = await getServiceByProviderAndName(foundProvider._id, name);
      if (existingService && existingService._id.toString() !== id) {
        return res.status(409).json({ message: 'Service with the same name already exists for this provider' });
      }

      const updatedServiceData = {
        name,
        description,
        price,
        category,
        provider: foundProvider._id,
      };

      if (req.files.length > 0) {
        await deleteImages(id);
        const imageUrls = req.files.map(file => file.path.replace('public/', '').replace(/\\/g, '/'));
        updatedServiceData.imageURL = `/services/${name}/${imageUrls[0].split('/').pop()}`;
        updatedServiceData.imageUrls = imageUrls.map(url => `/services/${name}/${url.split('/').pop()}`);
      }

      const updatedService = await updateServiceById(id, updatedServiceData);
      res.json(updatedService);
    } catch (error) {
      next(error);
    }
  });
}


export async function updateServiceByIdPatchController(req, res, next) {
  uploadServices(req, res, async (err) => {
    if (err) {
      return next(new HttpStatusError(500, `Error uploading files: ${err.message}`));
    }

    try {
      const { id } = req.params;
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

      if (req.files && req.files.length > 0) {
        const service = await getServiceById(id);
        if (service) {
          await deleteImages(id);
          const imageUrls = req.files.map(file => file.path.replace('public/', '').replace(/\\/g, '/'));
          updatedServiceData.imageURL = `/services/${name}/${imageUrls[0].split('/').pop()}`;
          updatedServiceData.imageUrls = imageUrls.map(url => `/services/${name}/${url.split('/').pop()}`);
        }
      }

      const updatedService = await updateServiceById(id, updatedServiceData);
      if (!updatedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(updatedService);
    } catch (error) {
      next(error);
    }
  });
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


