import { HttpStatusError } from 'common-errors';
import jwt from 'jsonwebtoken';
import { checkHash } from '../utils/encrypt.js';
import { getUserByName } from '../services/database/user-db-services.js';
import config from '../config.js';

export async function login(req, res, next){

       const { username, password } = req.body;

    try{

      const user = await getUserByName(username);

    if(user){
        // console.log(password, user.password);
        if(checkHash(password, user.password)){
            const userInfo = { id: user.id, username: user.username, role: user.role};
            const jwtConfig = { expiresIn: '1h'};
            const token = jwt.sign(userInfo, config.app.secretKey, jwtConfig);
            return res.status(200).send({token});
          }
        }

    throw new HttpStatusError(401, 'Invalid credentials');
}

catch(error){
    next(error);
}
}









