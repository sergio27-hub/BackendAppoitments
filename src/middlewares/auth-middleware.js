import { HttpStatusError } from "common-errors";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import config from "../config.js";

export async function checkToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    logger.error('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  const [_bearer, token] = authorization.split(' ');

  try {
    const tokenInfo = jwt.verify(token, config.app.secretKey);
    req.user = tokenInfo;
    next();
  } catch (err) {
    logger.error(err.message);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please login again' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
}
