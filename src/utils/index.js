/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
import {message} from 'antd'
import request from './request'
import composeMenus from './composeMenus'
import regRules from './regRules'
import CryptoJS  from "crypto-js"

const getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; //返回参数值
}
const getDict = type => {
    return new Promise(function (resolve, reject) {
        request.get(`/sys/dict/listBaseInfo/${type}`)
            .then(({data})=>{
                if(data.code===200){
                    resolve(data.data)
                }else{
                    reject(data.msg)
                }
            })
            .catch(err => {
                message.error(err.message)
            })
    })
}
const requestDict = async (type,callback)=>{
    let result = await getDict(type);
    callback(result)
}

//获取html
const htmlDecode = html =>{
    if(html){
        let div = document.createElement( 'div' );
        div.innerHTML = html;
        return div.textContent;
    }
};
//设置select值名不同
const setFormat = data =>{
    return data.map(item=>{
        return{
            //...item,
            value:item.id,
            text:item.name
        }
    })
}

const parseJsonToParams = data=>{
    let str = '';
    for(let key in data){
        if(typeof data[key] !== 'undefined' &&  data[key] !== undefined &&  data[key] !== '' && data[key] !== 'null' && data[key] !== null){
            str += `${key}=${data[key]}&`
        }
    }
    return str;
}

/**
 * 判断是否为空
 * @param val {string} 字符串
 */
const isEmpty = val=> {
    return val === null || val === undefined || val.trim() === ''
}

/**
 * 生成随机len位数字
 */
const randomLenNum = (len, date) => {
    let random = ''
    random = Math.ceil(Math.random() * 10000000000000).toString().substr(0, typeof len === 'number' ? len : 4)
    if (date) random = random + Date.now()
    return random
}


//加密
const encrypt=(value)=>{
    let key ="pigxpigxpigxpigx";
    let result = JSON.parse(JSON.stringify(value))
        key = CryptoJS.enc.Latin1.parse(key)
    const iv = key
        // 加密
    const encrypted = CryptoJS.AES.encrypt(
        value,
        key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        })
        result = encrypted.toString()
        return result //window.encodeURIComponent(result)


    // let data =  CryptoJS.AES.encrypt(value,CryptoJS.enc.Utf8.parse(key),{
    //     iv:CryptoJS.enc.Latin1.parse(key),
    //     mode:CryptoJS.mode.CBC,
    //     padding:CryptoJS.pad.ZeroPadding
    // })
    // return data = encrypted.toString()
}
//解密
// const decrypt=(value)=>{
//     var result = CryptoJS.AES.decrypt(value,CryptoJS.enc.Utf8.parse(key),{
//         iv:CryptoJS.enc.Latin1.parse(key),
//         mode:CryptoJS.mode.CBC,
//         padding:CryptoJS.pad.ZeroPadding
//     })
//     return result.toString(CryptoJS.enc.Utf8)
// }

export {
    regRules,
    request,
    getUrlParam,
    composeMenus,
    requestDict,
    htmlDecode,
    setFormat,
    parseJsonToParams,
    isEmpty,
    randomLenNum,
    encrypt,
    //decrypt,
}