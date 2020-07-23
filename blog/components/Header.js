import React,{useEffect,useState} from 'react'
import '../public/style/components/header.css'
import Router from 'next/router'
import {Row,Col, Menu} from 'antd'
import {
  HomeOutlined,
  FolderTwoTone,
  EyeOutlined,
  SmileTwoTone
} from '@ant-design/icons'
const Header = () => {
  const handleClick = (e) => {
      switch (e.key) {
          case "0":
              Router.push('/index')
              break;
          case "1":
              Router.push('/list')
              break;
          case "2":
              Router.push('/life')
              break;
          case "3":
              Router.push('/dream')
          default:
              break;
      }
    }

    return (
        <div className="header">
    <Row type="flex" justify="center">
        <Col  xs={21} sm={21} md={10} lg={10} xl={10}>
            <span className="header-logo">qjLove</span>
            <span className="header-txt">爱曼联,爱生活,更爱自己</span>
        </Col>

        <Col xs={3} sm={3} md={14} lg={8} xl={8}>
            <Menu  mode="horizontal" onClick={handleClick}>
                <Menu.Item key="0" icon={<HomeOutlined/>}>
                    首页
                </Menu.Item>
                <Menu.Item key="1" icon={<FolderTwoTone />}>
                    文章
                </Menu.Item>
                <Menu.Item key="2" icon={<EyeOutlined/>}>
                    生活
                </Menu.Item>
                <Menu.Item key="3" icon={<SmileTwoTone/>}>
                    畅想
                </Menu.Item>
                
            </Menu>
        </Col>
    </Row>
 </div>
    )
}
  


export default Header