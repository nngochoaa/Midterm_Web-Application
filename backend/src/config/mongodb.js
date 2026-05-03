import { MongoClient, ServerApiVersion } from 'mongodb'
import {env} from './environment.js'
let trelloDatabaseInstance = null


const mongoClientInstance = new MongoClient (env.MONGODB_URI,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})


export const CONNECT_DB = async () => {
    console.log(process.env.MONGODB_URI)
    await mongoClientInstance.connect()

    trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const CLOSE_DB = async () =>{
    await mongoClientInstance.close()
}

export const GET_DB = () => {
    if (!trelloDatabaseInstance) throw new Error('Must connect to database first')
        return trelloDatabaseInstance
}

