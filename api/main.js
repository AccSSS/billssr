import request from '../plugins/axios'

export function getMainData() {
    return request({
        url: '/api/getMainData',
        method: 'get'
    })
}

export function getPerData() {
    return request({
        url: '/api/getPerData',
        method: 'get'
    })
}