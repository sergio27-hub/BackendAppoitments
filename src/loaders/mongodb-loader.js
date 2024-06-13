import mongoose from "mongoose";
import logger from "../utils/logger.js";
import Config from "../config.js";

export default async function(config){
  // const url = `mongodb://${Config.icon.host}:${Config.icon.port}/${Config.icon.dbName}`
  const url = `mongodb+srv://${Config.icon.user}:${Config.icon.password}@cluster0.azjxklx.mongodb.net/${Config.icon.dbName}?retryWrites=true&w=majority`

  try{
    await mongoose.connect(url)
    logger.info(`Connected to MongoDB at ${url}`)
  }catch(err){
    logger.error(`Error connecting to MongoDB at ${url} \n${err}`)
  }
}
