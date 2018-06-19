import Cookies from 'js-cookie';

const username = 'username';

/**
 * @return {*}
 */
export function getName() {
    return Cookies.get(username);
}
/**
 * @param {*} name
 * @return {*}
 */
export function setName(name) {
    return Cookies.set(username, name);
}

/**
 * @return {*}
 */
export function removeName() {
    return Cookies.remove(username);
}