import Protocol from "../data/protocol.model"
import Block from "./block.model"

export default class FlowChart {

    columns: number = 0
    rows: number = 0

    width:number = 0
    height:number = 0

    protocol: Protocol | null = null

    blocks: Block[] = []

    constructor(){}

}