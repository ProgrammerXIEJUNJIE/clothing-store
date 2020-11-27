import axios from 'axios'
export function request(config,success,fail) {
    //1.创建axios实例
    const instance = axios.create({
       // baseURL:'http://123.207.32.32:8000/api/wh'
        baseURL:'',
        timeout:5000
    });
    //2.axios拦截器
        //拦截请求
    // instance.interceptors.request.use(config =>{
    //     console.log(config);
    //     return config
    // }, error => {
    //     console.log(error)
    // });

        //拦截响应
    instance.interceptors.response.use(res =>{
        //console.log(res)
        return res.data
    },error => {
        console.log(error)
    });
    //3.发送真正的网络请求
    return instance(config)
    //return instance(config)相当于返回一个Promise
  }

