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

    getNumberOfRows() : number {
        let sponsors: number[] = [];
        this.actions.forEach(action => {
            action.relationships.forEach(rel => {
                if (rel.type == ERelationship.comes ) {
                   sponsors.push(rel.target) 
                }
            });
        });
        return [...new Set(sponsors)].length
    }

}