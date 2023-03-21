import React, { Component } from 'react';
import { Layout, Menu } from "antd"

import { Link, Route, Switch } from "react-router-dom";

import Tasks from './Tasks'

class Index extends Component {

    render() {
        const { Header, Content } = Layout;


        const { match, history } = this.props;

        const selectedKeys = history.location.pathname.substr(1);
        const defaultOpenKeys = selectedKeys.split('/')[1];


        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        defaultOpenKeys={[defaultOpenKeys]}
                        selectedKeys={[selectedKeys]}
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="tasks">
                            <Link to="/tasks">Tasks</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Switch>
                        <Route path={`${match.url}tasks`} breadcrumbName="Tasks" component={Tasks} />
                    </Switch>
                </Content>
            </Layout>
        );
    }
}

export default Index;
