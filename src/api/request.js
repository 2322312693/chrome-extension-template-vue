//对于axios进行二次封装
import axios from "axios"

// import store from "@/store"
const requests = axios.create({
    // 配置对象
    // 基础路径:发请求的时候路径当中会出现api  
    // 请求超时的时间5s
    baseURL:'https://ai.imgkits.com',
    timeout: 60000,
});

// 请求拦截器：在发送请求之间，请求拦截器
requests.interceptors.request.use((config) => {
    // confgi 配置对象 属性 headers请求头
    return config
}, (error) => {
    return Promise.reject(error)
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 服务器响应成功的回调函数  相应拦截器可以检测到 可以做一些事情
    return res.data;
}, (error) => {
    // var originalRequest = error.config;
    // if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 && !originalRequest._retry){

    return Promise.reject(new Error(error))
})










export default requests;