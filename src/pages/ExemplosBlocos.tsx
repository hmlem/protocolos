import { Point } from "../models/visualization/point.model";

export function ExemplosBlocos() {

    // Tamanho do gráfico
    let flowchartWidth: number = 750;
    let flowchartHeight: number = 600;

    // Espaçamento entre o bloco e a safebox
    let hMargin = 50;
    let vMargin = 40;

    // A largura e altura do bloco serão definidas pela quantidade de texto
    let blockWidth = 200;
    let blockHeight = 80;

    // O centro do bloco vai ser definido pela "nuvem de pontos"
    let blockCenter = new Point(flowchartWidth/2, blockHeight/2 + vMargin );

    // Ponto esquerdo superior
    let blockX = blockCenter.x - blockWidth/2;
    let blockY = blockCenter.y - blockHeight/2;

    // Pontos de ligação do bloco
    let pTop : Point = new Point( blockCenter.x, blockCenter.y - blockHeight/2 );
    let pLeft : Point = new Point( blockCenter.x - blockWidth/2, blockCenter.y );
    let pRight : Point = new Point( blockCenter.x + blockWidth/2, blockCenter.y );
    let pBottom : Point = new Point( blockCenter.x, blockCenter.y + blockHeight/2 );

    let safeboxWidth = blockWidth + hMargin*2;
    let safeboxHeight = blockHeight + vMargin*2;

    let safeboxX = blockCenter.x - blockWidth/2 - hMargin;
    let safeboxY = blockCenter.y - blockHeight/2 - vMargin;

    let blockStyle = { fill:'#9edb7d', stroke: '#478724', borderRadius:'30', rx: '10', ry:'10'};
    let safeboxStyle = { fillOpacity:'0.1', stroke: '#478724', strokeDasharray: '5,5' };
    let yellowPointStyle = { fill:'#fcf758', stroke: '#fc8458' };

    return ( 
    <div className="flex justify-center">
        
        <svg width={flowchartWidth} height={flowchartHeight} className="border-4 border-slate-600">

        {/* Safebox */}
        <rect x={safeboxX} y={safeboxY} width={safeboxWidth} height={safeboxHeight} style={safeboxStyle} />
        {/* Block */}
        <rect x={blockX} y={blockY} width={blockWidth} height={blockHeight} style={blockStyle} />
        {/* Points */}
        <circle cx={pTop.x} cy={pTop.y} r={5} style={yellowPointStyle} />
        <circle cx={pLeft.x} cy={pLeft.y} r={5} style={yellowPointStyle} />
        <circle cx={pRight.x} cy={pRight.y} r={5} style={yellowPointStyle} />
        <circle cx={pBottom.x} cy={pBottom.y} r={5} style={yellowPointStyle} />

        </svg>

    </div>
    )
}