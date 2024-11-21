import axios from 'axios';

const api = axios.create({ baseURL: 'https://jorge-app.polijrinternal.com' });

export default api;
