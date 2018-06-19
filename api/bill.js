import request from '../plugins/axios';

export function getBillType() {
    return request({
        url: '/api/getBillType',
        method: 'get'
    })
}

export function addBill(params) {
    return request({
        url: '/api/addBill',
        method: 'get',
        params: params
    })
}

export function delBillLog(params) {
    return request({
        url: '/api/delBillLog',
        method: 'get',
        params: params
    })
}

export function getBillLogInfo(params) {
    return request({
        url: '/api/getBillLogInfo',
        method: 'get',
        params: params
    })
}

export function updateBillLogInfo(params) {
    return request({
        url: '/api/updateBillLogInfo',
        method: 'get',
        params: params
    })
}

export function updateBillStatus() {
    return request({
        url: '/api/updateBillStatus',
        method: 'get'
    })
}