import { useEffect, useState } from 'react';
import YAML from 'yaml'
import Protocol from '../models/data/protocol.model';
import ProtocolService from '../services/ProtocolService';

export function ProtocoloX() {

    const _protocolService : ProtocolService = new ProtocolService()

    const [ protocol, setProtocol ] = useState<Protocol>(new Protocol())

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

    /** Garante que o protocolo será trazido mesmo em caso de atualização
     * da página
     */
    useEffect(()=>{
        window.localStorage.setItem('protocol', YAML.stringify(protocol));
    },[protocol])

    return (
    <div className="flex justify-center">

        <svg width={750} height={600} className="border-4 border-slate-600">
            <text x={10} y={20}> {protocol.title} </text>
            <text x={10} y={100}> {protocol.getNumberOfRows()} </text>
        </svg>

    </div>
    )
}