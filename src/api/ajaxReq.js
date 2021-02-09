import Vue from 'vue'

export default function ajaxReq(url, data = {}, type = 'GET') {
    return new Promise(function (resolve, reject) {
        let req = null;
        if (type === 'GET') {
            req = Vue.axios.get(url, {
                params: data
            })
        }
        if (type === 'POST') {
            req = Vue.axios.post(url, data)
        }
        req.then(response => {
            if (response.status === 200 || response.status === 204) {
                resolve({
                    code: 1,
                    data: response.data,
                    error: ""
                })
            }
        })
        req.catch(error => {       
            resolve({
                code: 0,
                data: "",
                error: error.response.data
            })
            reject(error)     
        })
    })
}