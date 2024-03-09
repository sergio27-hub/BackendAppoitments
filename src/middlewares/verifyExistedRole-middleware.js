import { ROLES } from "../models/role.js";

export const verifyExistedRole = (req, res, next) => {
  if (req.body.role) {
    for (let i = 0; i < req.body.role.length; i++) {
      if (!ROLES.includes(req.body.role[i])) {
        return res.status(400).send({ message: `Role ${req.body.role[i]} does not exist` });
      }
    }
  }
  next();
}
