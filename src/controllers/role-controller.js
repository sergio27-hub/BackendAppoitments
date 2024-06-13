import { getAllRoles } from "../services/database/roles-db-services.js";

export const getAllRolesController = async (req, res, next) => {
  try {
    const roles = await getAllRoles();
    res.json(roles);
  } catch (error) {
    next(error);
  }
}
