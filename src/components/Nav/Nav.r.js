/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
import React, { Component } from 'react'
import {Avatar,List, Card } from 'antd'
import {withRouter,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Exception403 from 'modules/Exception/403'
import './styles.less'

const { Meta } = Card;

class NavRouter extends Component {

    state={
        isPermissions:false,
    }

    composeNav=(routes)=>{
        return routes.map(item=>{
            if(item && !item.to && item.icon){
                //console.log(difference(this.props.options, item.authorityInfo).length > 0)

                const component = {
                    ...item,
                    path:item.path,
                    name:item.name,
                    icon:item.icon  //|| {url:'/assets/routes_avatar/mainTax.svg', backgroundColor:'#61C5C3'} `icon_${i}`,
                }
                return component
            }

            return null;

        }).filter(item=>item);
    }

    component = () => (
            <List
                grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
                dataSource={this.composeNav(this.props.data)}
                renderItem={item => (
                    <List.Item onClick={()=>{
                        //如果是普通用户就需要手动跳转
                        parseInt(this.props.type, 0) === 1 && this.handlerClick(item)
                    }} >
                        <Link to={ parseInt(this.props.type, 0) === 8192 ? item.path : '###'}>
                            <Card className="nav-card">
                                <Meta
                                    avatar={<Avatar className="IconImg" src={item.icon.url}
                                                   /* style={{
                                            background:item.icon.backgroundColor
                                        }}*/
                                    />}
                                    //title={item.name}
                                    description={<span style={{color:'#666'}}>{item.name}</span>}
                                />
                            </Card>
                        </Link>
                    </List.Item>
                )}
            />
    )

    handlerClick=(item)=>{
        if(this.props.options.indexOf(item.authorityInfo[0]) > -1){
            this.setState({
                isPermissions:false
            },()=>{
                this.props.history.push(item.path)
            })
        }else{
            this.setState({
                isPermissions:true
            })
        }
    }

    render() {
        return  (
            <div>
                {
                    !this.state.isPermissions ? this.component() : <Exception403 />
                }
            </div>
        )
    }
}


export default withRouter(connect(state=>({
    options:state.user.getIn(['personal','options']),
    type:state.user.getIn(['personal','type'])
}))(NavRouter))