import Role from "../models/role.js";
import { HttpStatusError } from "common-errors";
import { getUserById, getUserByName } from "../services/database/user-db-services.js";


export const isUser = async (req, res, next) => {
  try {
    const user = await getUserByName(req.user.username);
    const roles = await Role.find({ _id: { $in: user.role } });

    let isUser = false;
    for (const role of roles) {
      if (role.name === 'user') {
        isUser = true;
        break;
      }
    }

    if (isUser) {
      next();
    } else {
      throw new HttpStatusError(403, 'Forbidden');
    }
  } catch (error) {
    next(error);
  }
};


export const isProvider = async (req, res, next) => {
  try {
    const user = await getUserByName(req.user.username);
    const roles = await Role.find({ _id: { $in: user.role } });

    let isProvider = false;
    for (const role of roles) {
      if (role.name === 'provider') {
        isProvider = true;
        break;
      }
    }

    if (isProvider) {
      next();
    } else {
      throw new HttpStatusError(403, 'Forbidden');
    }
  } catch (error) {
    next(error);
  }
};


export const isAdmin = async (req, res, next) => {
  try {
    const user = await getUserByName(req.user.username);
    const roles = await Role.find({ _id: { $in: user.role } });

    let isAdmin = false;
    for (const role of roles) {
      if (role.name === 'admin') {
        isAdmin = true;
        break;
      }
    }

    if (isAdmin) {
      next();
    } else {
      throw new HttpStatusError(403, 'Forbidden');
    }
  } catch (error) {
    next(error);
  }
};

export const isSuperUser = async (req, res, next) => {
  try {
    const user = await getUserByName(req.user.username);
    const roles = await Role.find({ _id: { $in: user.role } });

    let isSuperUser = false;
    for (const role of roles) {
      if (role.name === 'superusers') {
        isSuperUser = true;
        break;
      }
    }

    if (isSuperUser) {
      next();
    } else {
      throw new HttpStatusError(403, 'Forbidden');
    }
  } catch (error) {
    next(error);
  }
};



