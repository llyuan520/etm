/**
 * Created by liuliyuan on 2018/5/8.
 */
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {message} from 'antd'
import {getUrlParam} from 'utils'
import {connect} from 'react-redux'
import {login} from '../../redux/ducks/user'
class LoginWithURL extends Component{
    static propTypes={
        login:PropTypes.func.isRequired
    }
    //url通过token登录  /loginA?username=&token=
    loginWithToken(loginToken,username){
        const {login} = this.props;
        login({
            type:2,
            loginToken,
            username,
            success:()=>{
                this.props.history.push('/web')
            },
            fail:err=>{
                message.error(err)
            },
        })
    }
    componentWillMount(){

        const username=getUrlParam('username'),
            loginToken=getUrlParam('token');

        if(username && loginToken){
            this.loginWithToken(loginToken,username)
        }

    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        if(nextProps.isAuthed){
            nextProps.history.push('/web')
        }
    }
    render(){
        return(
            <div>
                {/*loginWithUrl-跳转登录*/}
            </div>
        )
    }
}

export default connect(state=>({
    isAuthed:state.user.get('isAuthed')
}),dispatch=>({
    //login:()=>{},
    login:login(dispatch),
}))(LoginWithURL)
