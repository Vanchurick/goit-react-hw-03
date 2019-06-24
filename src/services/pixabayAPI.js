import axios from 'axios';

const API_KEY = '12822384-0f4137aa01cc365f1b2d07932';

export const fetchImages = (query, page) =>
  axios.get(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${API_KEY}`,
  );
export const hey = () => null;
