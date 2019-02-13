/**
 * Created by hayzroyanghuanzhou on 2018/12/3.
 */
import React from 'react';
import {Spin} from 'antd';
import {BrowserRouter, Route, Redirect, Switch, Link} from 'react-router-dom';
import Loadable from "react-loadable";

class Router extends React.Component {

    render() {
        const PrivateRoute = ({component: Component, ...rest}) => {
            return (
                <Route
                    {...rest}
                    render={props =>
                        window.localStorage.getItem('token') ? (
                                <Component {...props} />
                            ) : (
                                <Redirect
                                    to={{
                                        pathname: "/login",
                                        state: {from: props.location}
                                    }}
                                />
                            )
                    }
                />
            );
        }
        const NoMatch = ({location}) => {
            return (
                <div>
                    <h1>404</h1>
                    <h3>
                        你要找的<code>{location.pathname}</code>页面不存在
                    </h3>
                    <Link to="/home">回到首页</Link>
                </div>
            );
        }
        return (
            <BrowserRouter>
                <Switch>
                    <Redirect exact={true} from="/" to="/login"/>
                    <Route path="/login" component={Loadable({
                        loader: () => import('../pages/login/Login'),
                        loading: () => <Spin/>,
                    })}/>
                    <PrivateRoute path="/home" component={Loadable({
                        loader: () => import('../pages/home/Home'),
                        loading: () => <Spin/>,
                    })}/>
                    <PrivateRoute path="/father" component={() => (
                        <div>
                            父路由内容
                            <Switch>
                                <PrivateRoute path="/father/aaa" component={Loadable({
                                    loader: () => import('../pages/test/Test'),
                                    loading: () => <Spin/>,
                                })}/>
                                <PrivateRoute path="/father/bbb" component={Loadable({
                                    loader: () => import('../pages/home/Home'),
                                    loading: () => <Spin/>,
                                })}/>
                            </Switch>
                        </div>
                    )}/>
                    <Route component={NoMatch}/>

                </Switch>
            </BrowserRouter>
        )
    }

}

export default Router;