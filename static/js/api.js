import axios from 'axios'
import { message } from 'ant-design-vue'
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'

axios.defaults.baseURL = 'http://119.3.210.185:9010'
// axios.defaults.baseURL = 'http://localhost:9010'

axios.defaults.timeout = 1000 * 15

// POST传参序列化y

// 返回状态判断
axios.interceptors.response.use((res) => {
  if (res.data.success) {
    return res
  } else {
    message.error(res.data.Msg);
    // return Promise.reject(res)
  }
}, (error) => {
  console.log(error)
})

let fetch=function(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        if(res!=undefined){
          resolve(res.data)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export {fetch}