import Action from "./action.model"

export default class Protocol {

    _id: number
    _title: string
    _description:string
    _author:string
    _reference: string
    _actions: Action[] = []

    constructor(id:number = 0, title:string = '', description: string = '', author: string = '', refenrece: string = '') {
        this._id = id
        this._title = title
        this._description = description 
        this._author =  author
        this._reference = refenrece
    }

}