import { useEffect, useState } from 'react';
import YAML from 'yaml'
import Protocol from '../models/data/protocol.model';
import Grid from '../models/visualization/grid.model';
import ProtocolService from '../services/ProtocolService';

export function ProtocoloX() {

    const _protocolService : ProtocolService = new ProtocolService()

    const [ protocol, setProtocol ] = useState<Protocol>(new Protocol())
    const [ grid, setGrid ] = useState<Grid>(new Grid(0,0))

    /** Traz o protocolo de acordo com o Id, o converte para um objeto
     * genérico e então atualiza o estado da variável global do protocolo
     * para uma variável do tipo Protocol. 
     */
    useEffect(() => {
        _protocolService.getProtocolById("C").then( res => {
            let newProtocol: Protocol = Object.assign(new Protocol(), YAML.parse(res.data) )
            setProtocol(newProtocol)
        })
    }, [])

    /** Executado sempre que o protocolo é atualizado. */
    useEffect(()=>{
        window.localStorage.setItem('protocol', YAML.stringify(protocol));
        setGrid(new Grid(protocol.getNumberOfRows(), protocol.getNumberOfColumns()))

    },[protocol])

    let maxBlockWidth = 100;
    let maxBlockHeight = 100;

    return (
    <div className="flex justify-center">


        <svg width={750} height={600} className="border-4 border-slate-600">
        {/* Metadata */}
        <text x={10} y={20} > Cols: { grid.cols.length } </text>
        <text x={10} y={40} > Rows: { grid.rows.length } </text>
        {/* Grid */}
        {
            grid.rows.map( (row,ri) => {
                return grid.cols.map( (col,ci) => {
                    return (
                        <g key={`grid-cell-container-coord(${ri},${ci})`}>
                            <rect key={`(${ri},${ci})`} 
                            x={ci*maxBlockWidth} y ={ri*maxBlockHeight} 
                            width={maxBlockWidth} height={maxBlockHeight} 
                            style={{fill:'rgb(100,100,220)', stroke:"rgb(0,0,0)"}}
                            />
                            <text key={`text-coord(${ri},${ci})`} x={ci*maxBlockWidth + 33} y={ri*maxBlockHeight + 50} > 
                                {`(${ri},${ci})`} 
                            </text>
                        </g>
                        )
                })
            })
        }
        
        </svg>

    </div>
    )
}