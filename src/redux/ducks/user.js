/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */

import { createActions, handleActions } from 'redux-actions'
//TODO:  npm 的时候必须加上版本号 4.0.0-rc.9  要不然 getIn() 用不了
import {fromJS} from 'immutable';
import { loginByUsername, logoutUser } from 'services/user' //getUserInfo, 
//import {message} from 'antd'

const initialState = fromJS({
    /**用户个人信息*/
    personal:{
        userame:null ,// 用户名
    },
    /**
     * 登录方式
     * 1：通过登录页登录
     * 2：通过url登录*/
    loginType:null,

    /**登录凭证 - 用户身份令牌*/
    token:null,
    refreshToken:null,

    /**是否登录成功*/
    isAuthed:false,

});

export const {personal, token, refreshToken, isAuthed, loginType,} = createActions({
    PERSONAL: {
        /**增加*/
        INCREMENT: info => info
    },
    TOKEN:{
        /**增加*/
        INCREMENT:token => token,
    },
    REFRESH_TOKEN:{
        /**增加*/
        INCREMENT:refreshToken => refreshToken,
    },
    IS_AUTHED:{
        /**登录*/
        LOGIN:() => true,
        /**退出*/
        LOGOUT:() => false
    },
    LOGIN_TYPE:{
        /**增加*/
        INCREMENT:type => type,
    },
})

export default handleActions({
    [personal.increment] : (state, {payload})=>{
        return state.set('personal', payload)
    },
    [token.increment] : (state, {payload})=>{
        return state.set('token', payload)
    },
    [refreshToken.increment] : (state, {payload})=>{
        return state.set('refreshToken', payload)
    },
    [isAuthed.login] : (state, {payload})=>{
        return state.set('isAuthed', payload)
    },
    [isAuthed.logout] : state=>{
        localStorage.clear();
        return initialState
    },
    [loginType.increment]:(state,{payload})=>{
        return state.set('loginType',payload)
    },
}, initialState)

export const login = dispatch => async ({username,password,code,randomStr,success,fail})=>{
    try {
        return await new Promise((resolve, reject) => {
                    loginByUsername(username, password, code, randomStr).then(response => {
                        const data = response.data
                        //判断是否是管理员 and 是否有权限 没有就跳转到403页面
                        dispatch(token.increment(data.access_token))
                        dispatch(refreshToken.increment(data.refresh_token))
                        
                        //用户信息获取成功的话
                        //所需信息全部加载完毕，完成登录
                        dispatch(isAuthed.login())
                        
                        //执行登录成功回调
                        success && success()
                        resolve(data)

                        // return new Promise((resolve, reject) => {
                        //     getUserInfo().then(({data}) => {
                        //         console.log(data)
                        //         //获取用户信息
                        //         dispatch(personal.increment(data.data))
                        //         resolve(data)
                        //     }).catch(err => {
                        //         console.log(err.msg)
                        //         reject(err.msg)
                        //     })
                        // })
                        
                    }).catch(error => {
                        const data = error.response.data
                        fail && fail(data.error_description)
                        //message.error(data.error_description,4)
                        reject(data.error_description)
                    })
            })
    
    }catch(err) {
        console.log(err)
    }
}

export const logout = dispatch => async () =>{
    return await new Promise((resolve, reject) => {
        logoutUser().then(() => {
            dispatch(isAuthed.logout())
            resolve()
        }).catch(err => {
            reject(err.msg)
            //return Promise.reject(err.msg);
            //message.error(err.msg,4)
        })
    })
}

export const saveToken = dispatch => async (data) =>{
    try {
        dispatch(token.increment(data))
    }catch (err){
        console.log(err)
    }
}

export const savePersonal = dispatch => async (data) =>{
    try {
        dispatch(personal.increment(data))
    }catch (err){
        console.log(err)
    }
}
