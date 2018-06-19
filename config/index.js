let baseURL = ''
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://127.0.0.1:3000/';
} else if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://111.231.89.14:3000/';
}

export {
    baseURL
}