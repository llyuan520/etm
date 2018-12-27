import * as React from 'react';
import { Form, Row, Col, Input, Button, Card, message } from 'antd';
import { compose } from 'redux';
import { request } from 'utils';
import {logout} from 'redux/ducks/user'
import {connect} from 'react-redux'
import './styles.less';
const FormItem = Form.Item;
class ChangePassword extends React.Component {
    state = {
        confirmDirty: false,
    };
    handleSubmit = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                request(`/modifyPassword`, {
                    method: 'POST',
                    body: values
                })
                    .then( res => {
                        if ( res.code === 200 ) {
                            message.success('密码修改成功，请重新登录');
                            const { logout } =  this.props;
                            logout();
                            return ;
                        } else {
                            return Promise.reject(res.msg);
                        }
                    })
                    .catch( resErr => {
                        message.error(`${resErr}`);
                    });
            }

        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPw')) {
            callback('两次密码输入不一致');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirmPw'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 24 },
            wrapperCol: { span: 18 },
        };
        return (
            <Card bordered={false}>
                <Form className="change-password-form">
                    <Row gutter={15}>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="当前密码"
                            >
                                {getFieldDecorator('originalPw', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入当前密码'
                                        }
                                    ]
                                })(
                                    <Input type="password" placeholder="当前密码" autoComplete="new-password" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="新密码"
                            >
                                {getFieldDecorator('newPw', {
                                    rules: [{
                                        required: true,
                                        pattern: /^(?![A-Za-z]+$)(?!\d+$)(?![\W_]+$)\S{8,16}$/,
                                        message: '至少8位字符，包含字母，数字和标点符号至少2种，区分大小写!',
                                    }, {
                                        validator: this.validateToNextPassword,
                                    }],
                                })(
                                    <Input type="password" placeholder="新密码" autoComplete="new-password" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="重新输入新密码"
                            >
                                {getFieldDecorator('confirmPw', {
                                    rules: [{
                                        required: true,
                                        message: '请重新输入新密码!',
                                    }, {
                                        validator: this.compareToFirstPassword,
                                    }],
                                })(
                                    <Input type="password" autoComplete="new-password" placeholder="重新输入新密码" onBlur={this.handleConfirmBlur} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <Button type="primary" onClick={this.handleSubmit} style={{marginTop: 5}}>确定</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        );
    }
}
const enhance = compose(
    connect(state=>({
        //isAuthed:state.user.get('isAuthed'),
    }),dispatch=>({
        logout:logout(dispatch)
    })),
    Form.create(),
);
export default enhance(ChangePassword);