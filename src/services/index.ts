import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(
  function (config) {
    const token = import.meta.env.VITE_TOKEN;
    if (token) {
      config.headers['token'] = token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { http };
