/**
 * Created by hayzroyanghuanzhou on 2018/12/3.
 */
import React from 'react';
import {Button, Input, notification} from 'antd';
import mockjs from 'mockjs';
import {IO_Login} from '../../api/login';
import {toBASE64} from '../../utils/utils';
import styles from './Login.scss';

// mockjs使用
const testData = mockjs.mock({
    'list|100': [{name: '@city', 'value|1-100': 150, 'type|0-2': 1}],
});
console.log(testData);
class Login extends React.Component {


    toLogin = async() => {
        try {
            const result = await IO_Login({
                username: "test005",
                password: toBASE64("123456"),
            });
            if (result.errorCode === 1000) {
                // todo 请求正确返回
                window.localStorage.setItem("token", result.data.token)

                this.props.history.push({pathname: "/home"});
            } else {
                // 后台返回的错误信息
                // todo 去做请求错误返回的时候的事情
                notification.info({
                    message: result.errorMsg
                })
            }
            console.log("接口拿到的结果：")
            console.log(result)
        } catch (e) {
            console.log("异常")
        }
    }

    render() {
        return (
            <div>
                <Button className={styles.btn} onClick={this.toLogin}>登录</Button>
                {
                    testData.list.map((item, index) => {
                        return <div key={index}>{item.name}</div>
                    })
                }
            </div>

        )
    }

}

export default Login;