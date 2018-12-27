
/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :TODO: 可以按需引入的模块列表见 https://github.com/ecomfe/echarts/blob/master/index.js
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {request} from 'utils'
import { Card, Row, Col, Icon, Avatar, Divider, List, message  } from 'antd';
import { savePersonal } from 'redux/ducks/user.js'
import './index.less'

const { Meta } = Card;

const notice = [
    {
        id:"1",
        title:"Alipay",
        icon:"lock",
        updatedAt:"2018-12-15T03:53:04.916Z",
        member:"修改密码",
        href:"",
        memberLink:""
    }
]

class Home extends Component {

    state = {
        userLoading:true,
        menuLoading:true,
        avatar:'',
        data:{
            deptName:'', 
            rolesName:[],
            userInfo:{
                permissions: [],
                roles: [],
                sysUser:{}
            },
        }, //用户信息
        userMenu:[], //菜单列表
        
    };

    componentDidMount() {
        this.fetchUserInfo()
        this.fetchUserMenu()
    }

    toggerUserLoading = userLoading =>this.setState({ userLoading })
    toggerUserMenuLoading = menuLoading =>this.setState({ menuLoading })

    //用户个人信息接口
    fetchUserInfo = () => {
        request.get(`/admin/user/userExtend`) //旧的接口名称： /admin/user/info
            .then(({data}) => {
                this.toggerUserLoading(false)
                if(data.code===0){
                    let resData = data.data
                    if(resData.userInfo && resData.userInfo.sysUser){
                        this.fetchAvatar(resData.userInfo.sysUser.pictId)
                    }
                    this.setState({
                        data:resData, //用户信息
                    },()=>{
                        const { savePersonal } = this.props
                        savePersonal(resData)
                    })
                }else{
                    message.error(data.msg)
                }
            })
            .catch(err => {
                this.toggerUserLoading(false)
                message.error(err.msg)
            })
    }

    //系统列表接口
    fetchUserMenu = () => {
        request.get(`/admin/menu/userMenu`)
            .then(({data}) => {
                this.toggerUserMenuLoading(false)
                this.setState({
                    userMenu:data
                })
            })
            .catch(err => {
                this.toggerUserMenuLoading(false)
                message.error(err.msg)
            })
    }

    //用户头像获取接口
    fetchAvatar = (pictId) => {
        request.get(`/admin/file/${pictId}`)
            .then(({data}) => {
                this.toggerUserLoading(false)
                if(data.code===0){
                    this.setState({
                        avatar:data.data
                    })
                }else{
                    message.error(data.msg)
                }
            })
            .catch(err => {
                this.toggerUserLoading(false)
                message.error(err.msg)
            })
    }

    render() {

        const { data: { deptName, userInfo }, userLoading, menuLoading, userMenu, avatar } = this.state;
        const isShow = userInfo && userInfo.sysUser
        return (
            <React.Fragment>
                <div style={{ padding: '30px' }}>
                    <Row gutter={24}>
                        <Col lg={7} md={24}>
                            <Card bordered={false} style={{ marginBottom: 24 }} loading={userLoading} >  
                                <div className="avatarHolder">
                                    <img alt={isShow && userInfo.sysUser.nickname} src={avatar && avatar} />
                                    <div className="name">{isShow && userInfo.sysUser.nickname}</div>
                                    {/* <div>海纳百川，有容乃大</div> */}
                                </div>
                                <div className="detail">
                                    {
                                        isShow && userInfo.sysUser.phone && (
                                            <p>
                                                <Icon type="phone" />
                                                {userInfo.sysUser.phone}
                                            </p>
                                        )
                                    }
                                    {
                                        deptName && (
                                            <p>
                                                <Icon type="tag" />
                                                {deptName}
                                            </p>
                                        )
                                    }
                                </div>
                                <Divider dashed />
                                <div className="team">
                                    <div className="teamTitle">个人设置</div>
                                    <Row gutter={36}>
                                        {notice.map(item => (
                                        <Col key={item.id} lg={24} xl={12}>
                                            <Link to={item.href}>
                                                <Avatar size="small" icon={item.icon} />
                                                {item.member}
                                            </Link>
                                        </Col>
                                        ))}
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                        <Col lg={17} md={24}>
                            <Card
                                className="tabsCard"
                                bordered={false}
                                //tabList={operationTabList}
                                //activeTabKey={location.pathname.replace(`${match.path}/`, '')}
                                onTabChange={this.onTabChange}
                                loading={menuLoading}
                                bodyStyle={{
                                    maxHeight:window.screen.availHeight-240,
                                    overflowY:'auto',
                                }}
                            >
                                <List
                                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
                                    dataSource={ userMenu }
                                    renderItem={item => (
                                        <List.Item 
                                            // onClick={()=>{
                                            //     this.handlerClick(item)
                                            // }} 
                                        >
                                            <Link to={ item.path }>
                                                <Card className="nav-card">
                                                    <Meta
                                                        avatar={
                                                            <Avatar className="IconImg" icon={item.icon}
                                                                        /* style={{
                                                                    background:item.icon.backgroundColor
                                                                }}*/
                                                            />
                                                        }
                                                        //title={item.name}
                                                        description={<span style={{color:'#666'}}>{item.name}</span>}
                                                    />
                                                </Card>
                                            </Link>
                                        </List.Item>
                                    )}
                                />
                                {/* {children} */}
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}
export default connect(state=>({
    //personal:state.user.get('personal'),
}),dispatch=>({
    savePersonal:savePersonal(dispatch)
}))(Home)