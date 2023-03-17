import YAML from 'yaml'
import { useEffect, useState } from "react"
import Protocol from "../models/data/protocol.model"
import ProtocolService from "../services/ProtocolService"
import FlowChart from "../models/visualization/flowchart.model"
import Block from '../models/visualization/block.model'
import Grid from '../models/visualization/grid.model'
import Action from '../models/data/action.model'
import { Point } from '../models/visualization/point.model'

export function ExemploProtocolo(){
    
    const _protocolService : ProtocolService = new ProtocolService()

    const [ protocol, setProtocol ] = useState<Protocol>(new Protocol())
    const [ flowchart, setFlowchart ] = useState<FlowChart>(new FlowChart())
    
    useEffect(() => {
        _protocolService.getProtocolByFileName("protocolo-com-decisao").then( res => {
            let newProtocol: Protocol = Object.assign(new Protocol(), YAML.parse(res.data) )
            setProtocol(newProtocol)
        })
    }, [])

    /** Executado sempre que o protocolo é atualizado. */
    useEffect(()=>{
        
        window.localStorage.setItem('protocol', YAML.stringify(protocol));

        let blocks : Block[] = getBlocksFromProtocol( protocol );

        let flowchart : FlowChart = Object.assign( new FlowChart(), { protocol: protocol })

        let grid: Grid = new Grid(flowchart.getNumberOfRows(), flowchart.getNumberOfColumns())
        flowchart = Object.assign( new FlowChart(), { protocol: protocol, blocks: blocks, grid: grid })

        if( protocol != null && blocks.length > 0 ) setFlowchart( flowchart )

    },[protocol])

    useEffect( ()=>{
        console.log(flowchart.blocks)
    },[ flowchart])

    let flowchartWidth: number = 750;
    let flowchartHeight: number = 600;

    return ( 
    <div className="flex justify-center">
        <svg width={flowchartWidth} height={flowchartHeight} className="border-4 border-slate-600">
            { flowchart.blocks.map( block => <circle key={`point-${block.center!.x}-${block.center!.y}`} cx={ block.center!.x * 20 + flowchartWidth/2} cy={block.center!.y * 20 + 20} r={10} />) }
        </svg>
    </div> 
    )
}

function getBlocksFromProtocol( protocol: Protocol ){
    
    let blocks : Block[] = []

    
    
    return blocks;

}
