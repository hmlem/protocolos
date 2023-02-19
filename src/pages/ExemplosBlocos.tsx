import Block from "../models/visualization/block.model";
import { Point } from "../models/visualization/point.model";

export function ExemplosBlocos() {

    // Tamanho do gráfico
    let flowchartWidth: number = 750;
    let flowchartHeight: number = 600;

    let blocks = [new Block( new Point(flowchartWidth/2, 300 ) )];

    return ( 
    <div className="flex justify-center">
        
        <svg width={flowchartWidth} height={flowchartHeight} className="border-4 border-slate-600">
            { blocks.map( block => block.draw() ) }
            { blocks.map( block => block.drawSafebox() ) }
            { blocks.map( block => block.drawConnectionPoints() ) }
        </svg>

    </div>
    )
}