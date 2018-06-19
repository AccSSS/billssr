// import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { setName, getName, removeName } from '../../utils/auth'
import { Message } from 'element-ui'
import { login, signout } from '../../api/user'
const user = {
    state: {
        username: getName(),
    },

    mutations: {
        set_username(state, username) {
            state.username = username;
        }
    },

    actions: {
        // 用户名登录
        login({ commit }, userInfo) {
            console.log(userInfo);
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    console.log(response)
                    const res = response.data;
                    if (res.code !== '0000') {
                        Message.error(res.msg);
                        resolve(res)
                    }

                    setName(username)
                    commit('set_username', username);
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        signout({ commit }) {
            return new Promise((resolve, reject) => {
                signout().then(response => {
                    const res = response.data;
                    if (res.code !== '0000') {
                        Message.error(res.msg);
                        resolve(res)
                    }

                    removeName()
                    commit('set_username', '');
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        FedLogOut({ commit }) {
            return new Promise((resolve, reject) => {
                removeName()
                commit('set_username', '');
                resolve()
            })
        }
    }
}

export default user