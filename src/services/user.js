
import { request } from "utils"

export const loginByUsername = (username, password, code, randomStr) => {
    const grant_type = 'password'
    const scope = 'server'
    return request({
        url: '/auth/oauth/token',
        headers: {
            Authorization:'Basic dGVzdDp0ZXN0',
        },
        method: 'post',
        params: { username, password, code, randomStr, grant_type, scope }
    })
}

export const getUserInfo = () => {
    return request.get('/admin/user/info')
}

export const logoutUser = () => {
    return request.get('/auth/oauth/removeToken')
}