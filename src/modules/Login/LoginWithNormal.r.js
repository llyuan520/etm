/**
 * Created by liuliyuan on 2018/5/8.
 */
import React, { Component, Fragment } from 'react'
import { Form, Icon, Input, Button, Alert,Row,Col} from 'antd'
import PropTypes from 'prop-types'
import { compose } from 'redux';
import {connect} from 'react-redux'
import {regRules,randomLenNum,encrypt} from 'utils'
import {login} from 'redux/ducks/user'
import GlobalFooter from 'components/Footer'
//import logo from './images/logo.png'
//import loginIcon from './images/login.png'
import './styles.less'
const FormItem = Form.Item;

const Captcha = (getFieldDecorator,context) =>{
    return (
        <FormItem style={{marginBottom: 0}}>
          <Row gutter={8}>
            <Col span={16}>
                {
                    getFieldDecorator('code', {
                        rules: [{
                            required: true, message: '请输入验证码!'
                            /*},{
                            pattern:regRules.password.pattern, message: regRules.password.message,*/
                        }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ fontSize: 14 }} />} placeholder="验证码" />
                    )
                }
            </Col>
            <Col span={8}>
                <div className="code">
                    <img alt='验证码' src={`${window.baseURL}code?randomStr=${context.state.random}`} onClick={context.refreshCode} />
                </div>
            </Col>
          </Row>
        </FormItem>
      );
}

class LoginWithNormal extends Component {
    static propTypes={
        login:PropTypes.func.isRequired
    }

    state={
        error:{
            visible:false,
            msg:'出错了！'
        },
        random:randomLenNum(),
        loading:false
    }

    refreshCode=()=>{
        this.setState({
            random:randomLenNum(this.state.random.lenght)
        })
    }

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { login } = this.props;
                this.toggleLoading(true)
                login({
                    username:values.username,
                    password:encrypt(values.password),
                    code:values.code,
                    randomStr:this.state.random,
                    type:1,//1表示正常通过登录页面登录,
                    success:()=>{
                        this.refreshCode()
                    },
                    fail:err=>{
                        this.setError(err)
                        this.refreshCode()
                        this.toggleLoading(false)
                    },
                })
            }
        });
    }

    toggleLoading=b=>{
        this.setState({
            loading:b
        })
    }
    setError=msg=>{
        this.setState({
            error:{
                visible:true,
                msg
            }
        },()=>{
            setTimeout(()=>{
                this.mount && this.setState(prevState=>({
                    error:{
                        ...prevState.error,
                        visible:false
                    }
                }))
            },4000)
        })
    }

    checkLoggedIn= props =>{
        const {isAuthed,history} = props;
        if(isAuthed){
            history.replace('/web');
        }
    }
    componentWillMount(){
        this.checkLoggedIn(this.props)
    }
    componentWillReceiveProps(nextProps){
        this.checkLoggedIn(nextProps)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="login-container">
                <header className='login-header'>
                    <div className="login-header-content">
                        {/* <img src={logo} alt="logo" style={{float:'left',marginRight:15}}/> */}
                        <span>易考管理系统</span>
                    </div>
                </header>
                <div className='login-content'>
                    <Row>
                        <Col span={12}>
                            {/* <img src={loginIcon} alt="login"/> */}
                            {/* 公告消息预留 */}
                        </Col>
                        <Col span={12}>
                            <Form onSubmit={this.handleSubmit}  className="loginForm">
                                <h2 className="welcome">易考管理系统</h2>
                                <FormItem>
                                    {getFieldDecorator('username', {
                                        initialValue:'362525198410170016',
                                        rules: [{
                                            required: true,message: '请输入用户名!'
                                        },{
                                            pattern:regRules.username.pattern, message: regRules.username.message,
                                        }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ fontSize: 14 }} />} placeholder="用户名" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        initialValue:'123456',
                                        rules: [{
                                            required: true, message: '请输入密码!'
                                            /*},{
                                             pattern:regRules.password.pattern, message: regRules.password.message,*/
                                        }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ fontSize: 14 }} />} type="password" placeholder="密码" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {
                                        Captcha(getFieldDecorator,this)
                                    }
                                </FormItem>
                                <FormItem style={{marginBottom: 12}}>
                                    {/*{getFieldDecorator('remember', {
                                     valuePropName: 'checked',
                                     initialValue: true,
                                     })(
                                     <Checkbox>记住密码</Checkbox>
                                     )}*/}
                                    <Button type="primary" htmlType="submit" className="loginFormButton">
                                        登录
                                    </Button>
                                </FormItem>
                                <FormItem>
                                    {
                                        this.state.error.visible ? <Alert key='errorMsg' message={this.state.error.msg} type="error" /> : null
                                    }
                                </FormItem>
                                {/* <p className="loginFormFooter">如需帮助，请拨打4000 888 600</p> */}
                            </Form>
                        </Col>
                    </Row>
                </div>
                <GlobalFooter
                   copyright={
                        <Fragment>
                            Copyright <Icon type="copyright" /> 2018 易考管理系统
                        </Fragment>
                   }
                />
                {/* <footer className="login-footer">
                    Copyright <Icon type="copyright" /> 2018 易考管理系统
                </footer> */}
            </div>
        )
    }
}

const enhance = compose(
    connect(state=>({
        isAuthed:state.user.get('isAuthed'),
    }),dispatch=>({
        login:login(dispatch)
    })),
    Form.create()
)
export default enhance(LoginWithNormal);