import { ActionType } from "../enums/EActionType"
import Action from "./action.model"
import Relationship from "./relationship.model"

export default class Protocol {

    id?: number
    metadata?: ProtocolMetadata
    actions?: Action[]
    relationships?: Relationship[] = []

    constructor() { }

    /**
     * O número de linhas é obitido pela quantidade de parentes únicos nas relações.
     * Por exemplo: se a Action B, vem de A e vai para C sabemos que há 3 linhas no gráfico.
     * @returns Número de Linhas de um gráfico de fluxo. 
     */
    getNumberOfRows() : number {
        return 1;
    }

    /**
     * //TODO
     */
    getNumberOfColumns() : number {
        return 1;
    }

    getStartAction(): Action { 
        return new Action()
     }

}

class ProtocolMetadata {
    title?: string
    description?:string
    author?:string
    reference?: string
}