import axios from 'axios';

export default class ProtocolService {

    constructor() {}

    getProtocolById = (id: string) => axios.get(`/data/protocolos/${id}.yml`);

}