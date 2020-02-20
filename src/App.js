import React, { Component } from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import { Author, Posts, Collection } from './pages';
import { Layout, Menu, Icon } from 'antd';
const { Content, Sider, Header } = Layout;

class App extends Component {
  constructor() {
    super();

    this.state = {
      collapsed: false
    }
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ padding: '0px 25px' }}>
          <h1 className="logo">W3HexSchool 鐵人賽</h1>
          <a href="https://github.com/B-l-u-e-b-e-r-r-y/BlogList" target="_blank">
            <Icon type="github" className="githubIcon" style={{ fontSize: '28px', color: '#ffffff' }} />
          </a>
        </Header>
        <Layout>
          <Sider collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            theme='light'
            width={180}
            style={{ background: '#fff' }}>
            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                  <Link to="/">
                    <Icon type="file-text" />
                    <span>所有文章</span>
                  </Link>
                </BrowserRouter>
              </Menu.Item>
              <Menu.Item key="2">
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                  <Link to="/Author">
                    <Icon type="user" />
                    <span>所有作者</span>
                  </Link>
                </BrowserRouter>
              </Menu.Item>
              <Menu.Item key="9">
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                  <Link to="/Collection">
                    <Icon type="heart" />
                    <span>我的收藏</span>
                  </Link>
                </BrowserRouter>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {/* <Author /> */}
              {/* <Posts /> */}
              {/* <Collection /> */}
              <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Route path="/" exact component={Posts} />
                <Route path="/author" component={Author} />
                <Route path="/collection" component={Collection} />
              </BrowserRouter>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
