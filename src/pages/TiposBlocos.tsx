import { useEffect, useState } from "react"
import Protocol from "../models/data/protocol.model"
import FlowChart from "../models/visualization/flowchart.model"
import ProtocolService from "../services/ProtocolService"
import YAML from 'yaml'

export function TiposBlocos(){
    
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

        console.log('-----Protocol-----')
        console.log(protocol)
        console.log('------------------')
        
        Object.assign( new FlowChart(), { protocol: protocol } )
        

    },[protocol])

}