/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */

import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {RouteWithSubRoutes,Header} from 'components' //BreadCrumb
import {Switch,Route } from 'react-router-dom';
import {logout} from '../redux/ducks/user'
import { Layout} from 'antd';
import {composeMenus} from 'utils'
import routes from '../modules/routes'
const menusData = composeMenus(routes);

class Web extends Component {

    static propTypes = {
        single:PropTypes.bool.isRequired,
        history:PropTypes.object.isRequired
    }
    static defaultProps = {
        single:false
    }
    checkIsAuthed= props =>{
        const {isAuthed,history} = props;
        if(!isAuthed){
            history.replace('/login');
        }
    }
    componentWillMount(){
        this.checkIsAuthed(this.props)
    }
    componentWillReceiveProps(nextProps){
        this.checkIsAuthed(nextProps)
    }

    render() {
        return (
            <Layout>
                <Header
                    menusData={menusData}
                    logout={()=>this.props.logout()} />
                <div id='main'>
                    <Layout style={{flex:1, width:'100%', maxWidth:1500,minWidth:1024,padding:'0 40px',marginLeft:'auto',marginRight:'auto'}}>
                        {/*<BreadCrumb location={this.props.location} routes={routes} />*/}
                        <Switch>
                            {routes.map((route, i) => (
                                <RouteWithSubRoutes key={i} {...route}/>
                            ))}
                            <Route path="*" component={()=><div>no match</div>} />
                        </Switch>
                    </Layout>
                </div>
            </Layout>
        )
    }
}

export default connect(state=>({
    personal:state.user.get('personal'),
    isAuthed:state.user.get('isAuthed'),
    realName:state.user.getIn(['personal','realname']),
    username:state.user.getIn(['personal','username']),
}),dispatch=>({
    logout:logout(dispatch)
}))(Web)