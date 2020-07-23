import Head from 'next/head'
import {Row, Col,Breadcrumb,Affix} from 'antd'
import Header from '../components/Header'
import React from 'react'
import Author from '../components/Author'
import Advert from '../components/Advert'
//import Footer from '../components/Footer'
import '../public/style/pages/detail.css'
import http from '../config/api'
import 'markdown-navbar/dist/navbar.css'
import axios from 'axios'
import Tocify from '../components/tocify.tsx'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'


import {
  FireFilled,
  FolderFilled,
  DashboardFilled
} from '@ant-design/icons'

export default function Detail(item) {
  const renderer = new marked.Renderer()
  const tocify = new Tocify()
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  }

  marked.setOptions({ 
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return highlight.highlightAuto(code).value
    }
  })
  let html = marked(item.article_content)
  return (
    <div className="page-opacity">
      <Head>
        <title>文章详情</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{item.typeName}</Breadcrumb.Item>
                  <Breadcrumb.Item>{item.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

             <div>
                <div className="detail-title">
                {item.title}
                </div>

                <div className="list-icon center">
                  <span><DashboardFilled /> {item.addTime}</span>
                  <span><FolderFilled /> {item.typeName}</span>
                  <span><FireFilled /> {item.view_count}</span>
                </div>

                <div className="detail-content" 
                 dangerouslySetInnerHTML={{ __html:html }}>
                </div>

             </div>

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
          <div className="detail-nav comm-box">
            <div className="nav-title">文章目录</div>
            <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
            </Affix>
        </Col>
      </Row>
      

   </div>
  )
}

Detail.getInitialProps = async (ctx) => {
  const id = ctx.query.id
  
  const res = await axios.get(http.getArticleById,{params:{id:id}})
  console.log(res.data.data[0].view_count)
  const view_count = res.data.data[0].view_count + 1
  const hot = await axios.get(http.updateHot,{params:{id:id,view_count:view_count}})
  return res.data.data[0]
}
