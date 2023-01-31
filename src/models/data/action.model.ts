import { ActionType } from "../enums/EActionType"
import Relationship from "./relationship.model"

export default class Action {

    id: number = -1
    description: String = ""
    reference: String = ""
    type: ActionType = ActionType.end
    relationships: Relationship[] = []

    constructor(){}

}