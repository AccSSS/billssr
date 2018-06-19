import { Message } from 'element-ui'
import { getMainData, getPerData } from '../../api/main'
const main = {
    state: {},

    mutations: {},

    actions: {
        getMainData({ commit }, params) {
            return new Promise((resolve, reject) => {
                getMainData(params).then(response => {
                    const res = response.data;
                    if (res.code !== '0000') {
                        // Message.error(res.msg);
                        resolve(res)
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        getPerData({ commit }, params) {
            return new Promise((resolve, reject) => {
                getPerData(params).then(response => {
                    const res = response.data;
                    if (res.code !== '0000') {
                        // Message.error(res.msg);
                        resolve(res)
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default main