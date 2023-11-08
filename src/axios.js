// axios
import axios from 'axios'
import router from './router';
import setting from '../baseSetting';
const baseURL = setting.baseUrl
const instance = axios.create({ baseURL });

instance.interceptors.response.use(undefined, (error) => {
    //console.log(router)
    if (error.response && error.response.status === 401) {
        router.replace({
            path: '/pages/login',
            query: { redirect: router.currentRoute.fullPath },
        });
    }
    return Promise.reject(error.response.data);
});

export default instance

