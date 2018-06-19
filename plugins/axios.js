import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '../store/index'
import { baseURL } from '../config/index'


import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';
// import { getToken } from '@/utils/auth'
// import { getAuth } from '@/utils/auth';

// `withCredentials` 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true;

// create an axios instance
const service = axios.create({
    baseURL: baseURL, // api的base_url
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
    // Do something before request is sent
    // if (store.getters.auth) {
    //     config.headers['auth'] = getAuth() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // }

    if (config.method === 'post' && !config.isJson) {
        config.data = qs.stringify(config.data)
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if (config.method === 'post' && config.isJson) {
        config.data = JSON.stringify(config.data)
        config.headers['Content-Type'] = 'application/json'
    }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code === '0009') {
            Message.error(res.msg)
            store().dispatch('FedLogOut').then(() => {
                if (process.browser) {
                    window.location = window.location.origin
                }
            });
            return response;
        } else {
            return response
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    })

export default service