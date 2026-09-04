import axios from 'axios';

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export const fetchPhotos = async (query, page=1, perPage=20) => {
    const res = await axios.get('https://api.unsplash.com/search/photos',{
        params: {query, page, per_page: perPage},
        headers: {Authorization: `Client-ID ${UNSPLASH_KEY}`}
    })
    return res.data
}

export const fetchVideos = async (query, perPage=20) => {
    const respo = await axios.get('https://api.pexels.com/v1/videos/search',{
        params: {query, per_page: perPage},
        headers: {Authorization:PEXELS_KEY}
    })
    return respo.data
}

export const fetchGifs = async (query, limit=20) => {
    const response = await axios.get('https://api.giphy.com/v1/gifs/search',{
        params: {q:query, api_key:GIPHY_KEY, limit},
})
    return response.data
}