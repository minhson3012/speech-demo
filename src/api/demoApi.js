import axiosClient from './axiosClient';

const demoApi = {
    submitSpeechData(data) {
        return axiosClient.post('', data)
    }
}

export default demoApi;