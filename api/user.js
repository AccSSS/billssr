import request from '../plugins/axios'

export function login(query) {
    return request({
        url: '/api/login',
        method: 'get',
        params: query
    })
}

export function signout(query) {
    return request({
        url: '/api/signout',
        method: 'get'
    })
}