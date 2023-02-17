import axios from 'axios';

export default class ProtocolService {

    constructor() {}

    getProtocolById = (id: string) => axios.get(`/data/protocolos/${id}.yml`);

    getProtocolByFileName = (name: string) => axios.get(`/data/protocolos/${name}.yml`);

}