import { Message } from 'element-ui'
import { getBillType, addBill, delBillLog, getBillLogInfo, updateBillLogInfo, updateBillStatus } from '../../api/bill'
const bill = {
    state: {},

    mutations: {},

    actions: {
        getBillType({ commit }, params) {
            return new Promise((resolve, reject) => {
                getBillType(params).then(response => {
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

        addBill({ commit }, params) {
            return new Promise((resolve, reject) => {
                addBill(params).then(response => {
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

        delBillLog({ commit }, params) {
            return new Promise((resolve, reject) => {
                delBillLog(params).then(response => {
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

        getBillLogInfo({ commit }, params) {
            return new Promise((resolve, reject) => {
                getBillLogInfo(params).then(response => {
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

        updateBillLogInfo({ commit }, params) {
            return new Promise((resolve, reject) => {
                updateBillLogInfo(params).then(response => {
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

        updateBillStatus({ commit }, params) {
            return new Promise((resolve, reject) => {
                updateBillStatus(params).then(response => {
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

export default bill