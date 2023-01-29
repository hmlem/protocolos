import { useEffect, useState } from 'react';
import YAML from 'yaml'
import Protocol from '../models/data/protocol.model';
import FlowChart from '../models/visualization/chart.model';
import ProtocolService from '../services/ProtocolService';

export function ProtocoloX() {

    const _protocolService : ProtocolService = new ProtocolService()

    const [ protocol, setProtocol ] = useState<Protocol>(new Protocol())
    const [ flowchart, setFlowchart ] = useState<FlowChart>(new FlowChart)

    useEffect(() => {
        _protocolService.getProtocolById("C").then( res => {
            setProtocol(YAML.parse(res.data));
        })
    }, [])

    useEffect(()=>{
        setFlowchart({...flowchart, protocol: protocol})
    },[protocol])

    return (
    <div className="flex justify-center">
        {/* TODO: Definir dinamicamente width e height  */}
        <svg width={750} height={600} className="border-4 border-slate-600">

            <text x={10} y={10}> Protocolo </text>
            <rect x={100} y={100} width={400} height={400}></rect>
        
        </svg>

       <div> {JSON.stringify(flowchart.protocol)} </div>

    </div>
    )
}