import Protocol from "../data/protocol.model"
import Block from "./block.model"
import Grid from "./grid.model"

export default class FlowChart {

    grid: Grid = new Grid(0,0)

    width:number = 0
    height:number = 0

    protocol: Protocol | null = null

    blocks: Block[] = []

    constructor(){}

    getNumberOfRows(){
        let sponsors = this.protocol!.relationships!.map( rel => rel.targetActionId ).flat()
        return [...new Set(sponsors)].length + 1
    }
    
    getNumberOfColumns(){
        let minGridXValue = 0;
        let maxGridXValue = 0;
        this.blocks.forEach( block => { 
            maxGridXValue = block.center!.x > maxGridXValue ? block.center!.x : maxGridXValue
            minGridXValue = block.center!.x < minGridXValue ? block.center!.x : minGridXValue
        })
        return ( Math.abs(maxGridXValue) + Math.abs(minGridXValue) + 1 )
    }

    draw(){
        return (<div></div>)
    }

}