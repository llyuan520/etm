
/**
 * author       : liuliyuan
 * createTime   : 2018/12/14 17:54
 * description  :
 */
import React,{Component} from 'react';
import LoginWithNormal from './LoginWithNormal.r'
import LoginWithURL from './LoginWithURL.r'
class Login extends Component{
    render(){
        return(
            <div>
                {
                    this.props.type === 1 ?  <LoginWithNormal {...this.props} /> : <LoginWithURL {...this.props} />
                }
            </div>
        )
    }
}
export default Login