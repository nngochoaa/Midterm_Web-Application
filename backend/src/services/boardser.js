import { boardModel } from "~/models/boardModel"
const createNew = async (reqBody) => {
try {
    const newBroad = {
        ...reqBody
    }

    const createBoard = await boardModel.createNew(newBroad)
    console.log(createBoard)
    return createBoard

} catch (error) {
    throw error
}

}
export const boardService = {
    createNew
}