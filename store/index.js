import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import main from './modules/main'
import bill from './modules/bill'
import getters from './modules/getters'

Vue.use(Vuex)

const store = () => {
    return new Vuex.Store({
        modules: {
            user,
            main,
            bill,
        },
        getters
    })
}

export default store