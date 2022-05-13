import axios from 'axios';

//Base da URL: https://api.themoviedb.org/3/
//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=9a3cc90d43e4d52a42cfb4f3f74ab03e

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;