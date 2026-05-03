import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { broadRoutes } from './broadRoute'
const Router = express.Router()

Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({message: 'APIs V1 hehe'})
})

Router.use('/boards', broadRoutes)

export const APIs_V1 = Router