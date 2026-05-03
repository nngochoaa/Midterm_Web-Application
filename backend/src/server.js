import express from 'express'
import exitHook from 'async-exit-hook'
import {CONNECT_DB, CLOSE_DB } from './config/mongodb'
import {env} from './config/environment.js'
import{ APIs_V1} from './routes/v1'
// import {errorHandlingMiddleware} from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {

const app = express()

app.use(express.json())

app.use('/v1', APIs_V1)

// app.use(errorHandlingMiddleware)

app.listen(env.APP_PORT, env.APP_HOST, () => {
  console.log(` Hi ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
})

    exitHook(() => {
        CLOSE_DB()
    }) 
}

(async () =>{
    try {
        console.log ('connecting')
        await CONNECT_DB()
        console.log ('connected')

        START_SERVER()
    } catch(error) {
        console.error(error)
        process.exit(0)
    }
})()

// CONNECT_DB()
//     .then(() => console.log('connected'))
//     .then(() => START_SERVER())
//     .catch(error =>{
//         console.error(error)
//         process.exit(0)
//     })
