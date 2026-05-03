import { StatusCodes } from 'http-status-codes'
import {boardService} from '~/services/boardser'
const createNew = async (req,res, next) => {

    try {
        console.log('req.body',req.body)
        console.log('req.query',req.query)
        console.log('req.params',req.params)
        console.log('req.files',req.files)
        console.log('req.cookies',req.cookies)
        console.log('req.jwtDecoded',req.jwtDecoded)

        const createBoard = await boardService.createNew(req.body)

        res.status(StatusCodes.CREATED).json(createBoard)
    
    } catch (error) {
        next(error)
        // console.log(error)
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     errors: error.message
        // })
    }

}
export const boardController ={
    createNew
}