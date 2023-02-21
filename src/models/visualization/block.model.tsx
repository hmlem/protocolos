import Action from "../data/action.model"
import { Point } from "./point.model"

export default class Block {

    /** global */
    hMargin = 50;
    vMargin = 40;

    /** Metadata */
    id: number = -1
    action?: Action = undefined

    /** Size */
    width?: number
    height?: number

    /** Text Box Size */
    textBoxMaxWidth?: number
    textBoxMaxHeight?: number

    /** Center Point */
    center?: Point

    /** Connection Points */
    top?: Point
    left?: Point
    right?: Point
    bottom?: Point

    /** Vertex Points */
    topLeft?: Point
    topRight?: Point
    bottomLeft?: Point
    bottomRight?: Point

    /** Safebox */
    safeboxCenter?: Point
    safeboxWidth?: number
    safeboxHeight?: number

    //TODO: gradientes nos backgrounds
    simpleActionBlockStyle = { fill:'#9edb7d', stroke: '#478724', borderRadius:'30', rx: '10', ry:'10'};
    decisionActionBlockStyle = { fill:'#A32C2C', stroke: '#A32C2C', borderRadius:'30', rx: '10', ry:'10'};
    safeboxStyle = { fillOpacity:'0.1', stroke: '#478724', strokeDasharray: '5,5' };
    yellowPointStyle = { fill:'#fcf758', stroke: '#fc8458' };


    constructor( centerPoint : Point,  ) {

        //TODO:
        // Define a largura e altura baseadas na quantidade de texto dentro da ação.
        this.width = 350;
        this.height = 330;

        // TODO:
        // Definido a partir do tamanho do texto.
        // Dividir em sm, md, lg e xlg
        this.textBoxMaxWidth = 300;
        this.textBoxMaxHeight = 500;

        this.center = centerPoint

        this.topLeft = new Point(this.center.x - this.width / 2, this.center.y - this.height / 2 );

        this.top = new Point( this.center.x, this.center.y - this.height/2 );
        this.left = new Point( this.center.x - this.width/2, this.center.y );
        this.right = new Point( this.center.x + this.width/2, this.center.y );
        this.bottom = new Point( this.center.x, this.center.y + this.height/2 );

        this.safeboxWidth = this.width + this.hMargin * 2;
        this.safeboxHeight = this.height + this.vMargin*2;
        this.safeboxCenter = new Point( this.center.x - this.width/2 - this.hMargin, this.center.y - this.height/2 - this.vMargin )

    }

    // TODO:  isRoot fica mais charmoso
    isTheFirstBlock = () => this.id == 0

    draw() {
        let blockType = 'decision'
        if ( blockType == 'simple' ) return ( 
            <g key={`block-${this.id}-text-container`}>
                <rect key={`${this.id}`} x={this.topLeft!.x} y={this.topLeft!.y} width={this.width} height={this.height} style={this.simpleActionBlockStyle} />
                <foreignObject key={`block-${this.id}-text`} x={this.topLeft!.x} y={this.topLeft!.y} width={this.width} height={this.height} >
                    {this.insertText()}
                </foreignObject>
            </g>
        )
        let A = new Point(this.left!.x, this.center!.y );
        let B = new Point(this.center!.x - this.width!/4, this.top!.y);
        let C = new Point(this.center!.x + this.width!/4, this.top!.y);
        let D = new Point(this.right!.x, this.center!.y);
        let E = new Point(this.center!.x + this.width!/4, this.bottom!.y)
        let F = new Point(this.center!.x - this.width!/4, this.bottom!.y)

        if (blockType = 'decision') return ( 
            <g key={`block-${this.id}-text-container`}>
                <polygon points={` ${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y} ${E.x},${E.y} ${F.x},${F.y}`} style={this.decisionActionBlockStyle} />
                <foreignObject key={`block-${this.id}-text`} x={this.topLeft!.x} y={this.topLeft!.y} width={this.width} height={this.height} >
                    {this.insertText()}
                </foreignObject>
            </g>
            )
    }

    insertText() {
        // TODO: dar um jeito de pegar a altura para definir a altura do block a ser desenhado. se não o texto vai ser renderizado mas não vai dar pra ver pq 
        // vai estar atrás do bloco 
        return (
            <div className="text-center mx-auto my-5" style={ {maxWidth: this.textBoxMaxWidth} }>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        )
    }

    drawSafebox() {
        return <rect key={`safebox-${this.id}`} x={this.safeboxCenter!.x} y={this.safeboxCenter!.y} width={this.safeboxWidth} height={this.safeboxHeight} style={this.safeboxStyle} />
    }

    drawConnectionPoints() {
        return ( 
        <g key={`connectection-points-${this.id}`}>
            <circle key={`connectection-point-top-${this.id}`} cx={this.top!.x} cy={this.top!.y} r={5} style={this.yellowPointStyle} />
            <circle key={`connectection-point-left-${this.id}`} cx={this.left!.x} cy={this.left!.y} r={5} style={this.yellowPointStyle} />
            <circle key={`connectection-point-right-${this.id}`} cx={this.right!.x} cy={this.right!.y} r={5} style={this.yellowPointStyle} />
            <circle key={`connectection-point-bottom-${this.id}`} cx={this.bottom!.x} cy={this.bottom!.y} r={5} style={this.yellowPointStyle} />
        </g>
        )
    }

}