import axios from 'axios';

const api = axios.create({ baseURL: 'https://jorge-back.puerino.com' });

export default api;
