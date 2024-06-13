import 'dotenv/config';

const Config = {
      port: process.env.PORT || 8080,
    icon: {
       host: process.env.MONGODB_HOST,
       port: process.env.MONGODB_PORT,
       dbName: process.env.MONGODB_DBNAME,
       user: process.env.MONGODB_USER,
       password: process.env.MONGODB_PASSWORD,
    },
    app: {
        secretKey: process.env.SECRET_KEY,
    },
    sonarqube:{
        password: process.env.SONARQUBE_PASSWORD,
    }
}


export default Config;
