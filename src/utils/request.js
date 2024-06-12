import axios from "axios"
import qs from 'qs';
import router from "@/router";

import { notify } from './globalMethods';


// 创建axios实例
const instance = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
});
axios.defaults.withCredentials = true;
// 添加请求拦截器
instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    // post请求时，将json数据转换为字符串
    if (config.method === "post") {
         config.data = qs.stringify(config.data);
    }
    // 在发送请求之前做些什么
    const token = localStorage.getItem('jwtToken'); // 从localStorage中获取token
    if (token) {
        config.headers.Authorization = token; // 如果token存在，将token添加到请求头中
    }
    return config;
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
// 添加响应拦截器
instance.interceptors.response.use(response => {
    // 对响应数据做点什么
    // 如果http状态码不等于200，抛出错误
    if (response.status !== 200) {
        console.log('HTTP status is not 200');
        return Promise.reject(response);
    }
    return response;
}, error => {
    if (error.response) {
        if (error.response.status === 401) {
            notify({
                title: '警告',
                message: '登录过期，请重新登录',
                type: 'warning',
                position:'top-right'
              });
            // 清除过期的 Token
            localStorage.removeItem('jwtToken')
            // 重定向到登录页面
            router.push('/login')
        }
    } else {
        console.log('Error:', error.message);
    }
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default instance;
