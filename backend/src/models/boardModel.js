import Joi from "joi";
import { GET_DB } from "~/config/mongodb";
const BOARD_COLLECTION_NAME = 'board'
const BOARD_COLLECTION_SCHEMA = Joi.object({
    name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  category: String,
  isLive: { type: Boolean, default: false },
  sold: { type: Number, default: 0 }
})

const createNew = async (data) => {
    try {
    const createBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(data)
    return createBoard
    } catch (error) {
        throw new Error(error)
        
    }
}
export const boardModel = {
    BOARD_COLLECTION_NAME,
    BOARD_COLLECTION_SCHEMA,
    createNew
}