import axios from 'axios';
import { useEffect, useState } from 'react';
import YAML from 'yaml'
import Protocol from '../models/data/protocol.model';

export function ProtocoloX() {

    const [ protocol, setProtocol ] = useState(new Protocol())

    useEffect(() => {
        axios.get('/data/protocolos/C.yml')
        .then( res => { 
            setProtocol(YAML.parse(res.data))
        })
        .catch( err => console.log(err.message) )
    }, [])

    return (
    <div className="flex justify-center">
        {/* TODO: Definir dinamicamente width e height  */}
        <svg width={750} height={600} className="border-4 border-slate-600">

            <text x={10} y={10}> Protocolo </text>
            <rect x={100} y={100} width={400} height={400}></rect>
        
        </svg>

       <div> {JSON.stringify(protocol)} </div>

    </div>
    )
}