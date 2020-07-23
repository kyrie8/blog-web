import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb} from 'antd';
import '../static/css/AdminIndex.css'
import { Link, Route , Switch} from "react-router-dom";
import AddArticle from './AddArticle'
import DelArticle from './DelArticle'
import ArticleList from './ArticleList'
import {
  HomeOutlined,
  CodeSandboxOutlined,
  FormOutlined,
  AimOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(){

  const [collapsed,setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider  collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="title">qjLove</div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <HomeOutlined/>
              <span>工作台</span>
            </Menu.Item>
            <Menu.Item key="2">
            <FormOutlined />
              <Link to='/adminIndex/addArticle/'>添加文章</Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <CodeSandboxOutlined />
                  <span>文章管理</span>
                </span>
              }
            >
              <Menu.Item key="3">
              <Link to='/adminIndex/delArticle/'>删除文章</Link>
              </Menu.Item>
              <Menu.Item key="4">
              <Link to='/adminIndex/ArticleList/'>文章列表</Link>
              </Menu.Item>

            </SubMenu>

            <Menu.Item key="9">
            <AimOutlined />
              <span>留言管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
              <Route path='/adminIndex/addArticle/' component={AddArticle} />
              <Route path='/adminIndex/delArticle/' component = {DelArticle}/>
              <Route path='/adminIndex/ArticleList/' component = {ArticleList}/>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>qjLove</Footer>
        </Layout>
      </Layout>
    )

}

export default AdminIndex