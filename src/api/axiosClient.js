import axios from 'axios';
// import queryString from 'query-string'
const BASE_URL = process.env.REACT_APP_BASE_API_URL;
// const BASE_URL_MOCK = process.env.REACT_APP_BASE_MOCK_API;
const axiosClient = axios.create({
    baseURL: BASE_URL,

    // timeout: 10000,
    // withCredentials: true,
    // transformRequest: [(data) => JSON.stringify(data.data)],
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + process.env.REACT_APP_GOOGLE_TOKEN,
    }
    // paramsSerializer:params => queryString.stringify(params)
});

export default axiosClient;