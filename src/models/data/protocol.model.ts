import Block from "../visualization/block.model"
import { Point } from "../visualization/point.model"
import Action from "./action.model"
import { ProtocolMetadata } from "./protocolMetadata.model"
import Relationship from "./relationship.model"

export default class Protocol {

    id?: number
    metadata?: ProtocolMetadata
    actions?: Action[]
    relationships?: Relationship[] = []

    constructor() { }

    getBlocks() : Block[] {
        
        let blocks : Block[] = []
    
        this.relationships?.forEach( relationship => {

            let originAction : Action
            let targetAction : Action

            originAction = this.actions?.find( action => action.id == relationship.originActionId )!
            targetAction = this.actions?.find( action => action.id == relationship.targetActionId )!

            let originBlockCenterPoint = new Point(0,0)
            let targetOptionCenterPoint = new Point(0,0)

            
            

        })

        return blocks;
    }

}