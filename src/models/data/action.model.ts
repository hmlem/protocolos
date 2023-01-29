import { ActionType } from "../enums/EActionType"
import Relation from "./relation.model"

export default class Action {

    _id: number = -1
    _description: String = ""
    _reference: String = ""
    _type: ActionType = ActionType.end
    _relations: Relation[] = []

    constructor(){}

}