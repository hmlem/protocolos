export default class Grid {

    rows: Array<any> = []
    cols: Array<any> = []

    constructor(rows: number, columns: number){

        for( let i = 0; i< rows; i++){
            this.rows.push(0)
        }

        for( let i = 0; i< columns; i++){
            this.cols.push(0)
        }

    }

    draw() {
        
    }

}