/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
import {wrapPage} from 'components'
import Home from './Home';
import ChangePassword from './ChangePassword';

const PATH = '/web';
const routes = [
    {
        path:`${PATH}`,
        component:wrapPage('易考管理平台 - 主页', Home),
        name:'首页',
        icon:'user',
        exact:true,
    },{
        path:`${PATH}/ChangePassword`,
        component:wrapPage('修改密码', ChangePassword),
        name:'修改密码',
        icon:'user',
        exact:true,
    },{
        path:'/',
        redirect:true,
        to:`${PATH}`,
    }
]

export default routes