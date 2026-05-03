import Joi from "joi";
import { GET_DB } from "~/config/mongodb";
const BOARD_COLLECTION_NAME = 'board'
const liveStreamSchema = new mongoose.Schema({
  title: String,
  host: String,
  viewers: { type: Number, default: 0 },
  thumbnail: String,
  // Lưu mảng ID của các sản phẩm liên quan
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

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
    liveStreamSchema,
    createNew
}