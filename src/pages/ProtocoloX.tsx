import { useEffect, useState } from 'react';
import YAML from 'yaml'
import Action from '../models/data/action.model';
import Protocol from '../models/data/protocol.model';
import { ActionType } from '../models/enums/EActionType';
import Block from '../models/visualization/block.model';
import FlowChart from '../models/visualization/flowchart.model';
import Grid from '../models/visualization/grid.model';
import { Point } from '../models/visualization/point.model';
import ProtocolService from '../services/ProtocolService';

export function ProtocoloX() {

    const _protocolService : ProtocolService = new ProtocolService()

    const [ protocol, setProtocol ] = useState<Protocol>(new Protocol())
    const [ flowchart, setFlowchart ] = useState<FlowChart>(new FlowChart())

    /** Traz o protocolo de acordo com o Id, o converte para um objeto
     * genérico e então atualiza o estado da variável global do protocolo
     * para uma variável do tipo Protocol. 
     */
    useEffect(() => {
        _protocolService.getProtocolByFileName("protocolo-simples").then( res => {
            let newProtocol: Protocol = Object.assign(new Protocol(), YAML.parse(res.data) )
            setProtocol(newProtocol)
        })
    }, [])

    /** Executado sempre que o protocolo é atualizado. */
    useEffect(()=>{
        
        window.localStorage.setItem('protocol', YAML.stringify(protocol));

        // console.log('-----Protocol-----')
        // console.log(protocol)
        // console.log('------------------')

        let blocks : Block[] = getBlocksFromProtocol( protocol );

        // console.log('---Blocos---')
        // console.log(blocks)
        // console.log('------------')

        let flowchart : FlowChart = Object.assign( new FlowChart(), { protocol: protocol })

        let grid: Grid = new Grid(flowchart.getNumberOfRows(), flowchart.getNumberOfColumns())
        flowchart = Object.assign( new FlowChart(), { protocol: protocol, blocks: blocks, grid: grid })

        if( protocol != null && blocks.length > 0 ) setFlowchart( flowchart )

    },[protocol])

    useEffect( ()=>{
        console.log(flowchart.blocks)
    },[ flowchart])

    return (
    <div className="flex justify-center">

        {/* Draw Grid */}
        <svg width={750} height={600} className="border-4 border-slate-600">
        {/* Metadata */}
        <text x={10} y={20} > Cols: { flowchart.grid.cols.length } </text>
        <text x={10} y={40} > Rows: { flowchart.grid.rows.length } </text>
        {/* Grid */}
        {
            drawGrid(flowchart)
        }
        {/* Flowchart */}
        {
            // drawflowchart(flowchart)
        }
        </svg>

    </div>
    )
}

/**
 * Retorna o conjunto de blocos com coordenadas da GRID.
 * A função assume que há um e apenas um bloco com tipo
 * EActionType.start
 * @param Blocks 
 * @type Block[]
 * @returns  
 */
function delegateBlocksOnGrid(blocks: Block[]) : Block[] {
    // console.log(blocks[0].actionType == 'beginning')

    // blocks.filter(block => block.actionType == ActionType.start)[0].gridX = 0;
    // blocks.filter(block => block.actionType == ActionType.start)[0].gridY = 0;

    return [];
}

function getActionTypeFromString( value: any ) {
    switch ( value ) {
        case 'beginning': return ActionType.start
        case 'simple': return ActionType.simple
        case 'decision': return ActionType.decision
        case 'end': return ActionType.end
    }
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
                    let beginningBlock: Block = Object.assign(new Block(new Point(0,0), new Action()), { id: rel.originActionId, action: startAction } )
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

                let newBlock: Block = Object.assign( new Block( new Point(newBlockGridX,newBlockGridY ), new Action() ), { id: rel.targetActionId, gridX: newBlockGridX, gridY: newBlockGridY,action: targetAction });
                blocks.push(newBlock);
            }
           
        });

        return blocks;
}

function drawGrid( flowchart: FlowChart){

    let maxBlockWidth = 100;
    let maxBlockHeight = 100;

    return flowchart.grid.cols.map( (col,ci) => {
        return flowchart.grid.rows.map( (row,ri) => {
            return (
                <g key={`grid-cell-container-coord(${ci},${ri})`} opacity="0.5">
                    <rect key={`(${ci},${ri})`} 
                    x={ci*maxBlockWidth} y ={ri*maxBlockHeight} 
                    width={maxBlockWidth} height={maxBlockHeight} 
                    style={{fill:'rgb(100,100,220)', stroke:"rgb(0,0,0)"}}
                    />
                    <text key={`text-coord(${ci},${ri})`} x={ci*maxBlockWidth + 33} y={ri*maxBlockHeight + 50} > 
                        {`(${ci},${ri})`} 
                    </text>
                </g>
            )
        })
    })
}

function drawflowchart( flowchart: FlowChart ) {
    return (<div></div>)
}