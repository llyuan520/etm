/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {Layout} from 'antd'
import {RouteWithSubRoutes,wrapPage} from 'components'

import Web from 'modules/Web.r';
import Login from 'modules/Login';
import Exception403 from 'modules/Exception/403';
import Exception404 from 'modules/Exception/404';
import Exception500 from 'modules/Exception/500';

const routes = [
    {
        path:'/web',
        component:wrapPage('易考管理平台 - 主页', Web),
        name:'主页',
    },{
        path:'/login',
        component:wrapPage('登录', props=><Login {...props} type={1}/>),
        name:'登录'
    },{
        path:'/loginA',
        component:props=><Login {...props} type={2}/>,
        name:'url登录'
    },{
        path:'/403',
        component:wrapPage('403', Exception403),
        name:'403',
    },{
        path:'/404',
        component:wrapPage('404', Exception404),
        name:'404',
    },{
        path:'/500',
        component:wrapPage('500', Exception500),
        name:'500',
    },{
        path:'*',
        redirect:true,
        to:'/web'
    }
]

const mainRoutes =(
    <Route render={({location})=>{
        const homeRoute = () => (
            <Redirect to="/login"/>
        );
        return(
            <Layout>
                <Route exact strict path="/" render={homeRoute} /> 
                <Switch>
                    {routes.map((route, index) => (
                        <RouteWithSubRoutes key={index} {...route}/>
                    ))}
                </Switch>

            </Layout>
        )
    }} />
)

export default mainRoutes