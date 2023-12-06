const LOCALHOST_BASE_URL = 'http://localhost:8000/api/comics/';
const API_BSAE_URL = 'https://veganbeef.pythonanywhere.com/api/comics/';
export const BASE_URL = process.env.API_BASE_URL ?? API_BSAE_URL ?? LOCALHOST_BASE_URL;
