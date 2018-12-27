/**
 * author       : liuliyuan
 * createTime   : 2017/12/6 10:21
 * description  :
 */

import React, { Component } from 'react';
import { Layout,Menu,Row,Icon,Modal} from 'antd';
import {connect} from 'react-redux'
import {withRouter,Link} from 'react-router-dom'
import './header.less'

const { Header} = Layout;
const confirm = Modal.confirm;
const SubMenu = Menu.SubMenu;

class WimsHeader extends Component {

    handlerClick = ({item, key, keyPath})=>{
        if(key==='exit'){
            confirm({
                title: '系统提示',
                content: '确定要退出吗',
                onOk:()=>this.props.logout(),
                onCancel() {},
            });
        }
    }

    render() {
        return (
            <Header style={{backgroundColor:'#0F83E6',padding: '0 40px',minWidth: 1024}}>
                    <Row style={{maxWidth:1420,margin:'0 auto',overflow:'hidden',minWidth: 944}}>
                        <div style={{overflow:'hidden',float:'left'}}>
                            <Link to="/web" >
                                <div style={{
                                    overflow:'hidden',
                                    width:115,
                                    height:64,
                                    float:'left',
                                    display:'flex',
                                    alignItems:'center',
                                    marginRight:20
                                }}>
                                    <h1 style={{fontSize:'22px',color:'#fff'}}>易考管理</h1>
                                    {/* <img width='100%' src="/imgs/logo-header.png" alt="logo"/> */}
                                </div>
                            </Link>
                            {/* <div style={{display:'inline-block',lineHeight:'20px',float:'left',paddingTop:23}}>
                                <p>
                                        <span style={{
                                            color:'#7BC1F3'
                                        }}>
                                            如需帮助，请拨打4000 000 000
                                        </span>
                                </p>
                            </div> */}
                        </div>
                        <Menu
                            mode="horizontal"
                            onClick={this.handlerClick}
                            style={{width:'auto',float:'right',marginRight:'-20px', height:64,}}
                            className='scf-menu-root scf-menu-right'
                        >
                            <Menu.Item key="exit" >
                                <Icon type="poweroff" />退出
                            </Menu.Item>
                            <SubMenu key="sub1" title={
                                <Link style={{color:'#fff', display: 'inline-block', textDecoration: 'none'}} to='/web'>
                                    <Icon type="user" />
                                    {this.props.realName}
                                </Link>
                            }>
                                <Menu.Item style={{textAlign: 'center'}} key="resetPassword">
                                    <Link to='/web/ChangePassword'>修改密码</Link>
                                </Menu.Item>
                            </SubMenu> 
                            {/* <Menu.Item key="company" >
                                <Link style={{color:'#fff'}} to='/web/company'>{this.props.realName}</Link>
                            </Menu.Item> */}
                        </Menu>
                    </Row>
                </Header>
        )
    }
}

export default withRouter(connect(state=>{
    return {
        isAuthed:state.user.get('isAuthed'),
        realName:state.user.getIn(['personal','realname']),  
    }
})(WimsHeader))