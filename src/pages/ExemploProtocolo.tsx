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
    
    let startAction: Action = Object.assign(new Action(), protocol.actions?.filter( a => a.id == 0 )[0]!);// TODO: necessita que o primeiro, inicio do protocolo, seja com id 0. talvez mudar depois.

        // Para cada relação, o algoritimo vai pegar a origem e o destino e
        // vai transformar em blocos. Se um deles for origem, vai receber 0,0

        protocol.relationships?.forEach( rel => {

            // Verifica se já não há bloco com o id da ação de origem da relação.
            if ( blocks.find( block => block.id == rel.originActionId) == undefined ) {

                if( rel.originActionId == startAction.id ){
                    let beginningBlock: Block = Object.assign(new Block(new Point(0,0)), { id: rel.originActionId, action: startAction } )
                    blocks.push(beginningBlock)
                }

            }

            // verifica se o bloco do destino da relação já não está no array de blocos
            if( blocks.filter( b => b.id == rel.targetActionId ).length == 0 ) {

                let originBlock: Block = blocks.find( block => block.id == rel.originActionId )!;
                let targetAction: Action = protocol.actions!.find( action => action.id == rel.targetActionId )!;
                let newBlockGridX = 0
                let newBlockGridY = originBlock.center!.y + 1;

                if (originBlock.action?.type != 'decision') {
                    newBlockGridX = originBlock.center!.x
                } else {
                    if ( rel.rule == 'yes') newBlockGridX = originBlock.center!.x + 1
                    if ( rel.rule == 'no') newBlockGridX = originBlock.center!.x - 1
                }

                let newBlock: Block = Object.assign( new Block( new Point(newBlockGridX,newBlockGridY ) ), { id: rel.targetActionId, gridX: newBlockGridX, gridY: newBlockGridY,action: targetAction });
                blocks.push(newBlock);
            }
           
        });

        // Positivar blocos com x negativo:
        let minValue = 0
        blocks.forEach( block => { minValue = block.center!.x < minValue ? block.center!.x : minValue })
        let correction = Math.abs( minValue )
        blocks.forEach( block => { block.center!.x += correction })

        return blocks;
}
