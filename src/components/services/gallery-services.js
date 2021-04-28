import axios from 'axios';

export const fetchImages = (query = '', page = 1) => {
    const KEY = "20957573-739e267d9cf8553f9fb24fb52";
    const baseURL = "https://pixabay.com/api/";
    return axios.get(`${baseURL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=20`);
};

// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12