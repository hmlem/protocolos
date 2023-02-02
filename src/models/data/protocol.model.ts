import { ERelationship } from "../enums/ERelashionshipType"
import Action from "./action.model"

export default class Protocol {

    id?: number
    title?: string
    description?:string
    author?:string
    reference?: string
    actions: Action[] = []

    constructor() {
    }

    /**
     * O número de linhas é obitido pela quantidade de parentes únicos nas relações.
     * Por exemplo: se a Action B, vem de A e vai para C sabemos que há 3 linhas no gráfico.
     * @returns Número de Linhas de um gráfico de fluxo. 
     */
    getNumberOfRows() : number {
        let sponsors = this.actions.map( action => action.relationships.map( rel => rel.target) ).flat()
        return [...new Set(sponsors)].length
    }

    // TODO
    getNumberOfColumns() : number {
        return 1;
    }

}