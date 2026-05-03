import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { board } from '~/validations/board.js'
import {boardController} from '~/controllers/boardController'
const Router = express.Router()

Router.route('/')
    .get((req, res)=>{
        res.status(StatusCodes.OK).json({message: 'Board'})
    })
    .post(board.createNew,boardController.createNew)
export const broadRoutes = Router
