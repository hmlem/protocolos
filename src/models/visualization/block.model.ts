import Action from "../data/action.model"
import { ActionType } from "../enums/EActionType"
import { EBlockShape } from "../enums/EBlockShapes"

export default class Block {

    id: number = -1
    gridX: number = 0
    gridY: number = 0
    shape: EBlockShape = EBlockShape.rectangle
    action?: Action = undefined

    constructor(){}

}