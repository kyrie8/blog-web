import Head from 'next/head'
import Link from 'next/link'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import {Row, Col,List} from 'antd'
import '../public/style/pages/index.css'
import Header from '../components/Header'
import React,{useState} from 'react'
import axios from 'axios'
import http from '../config/api'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'




import {
  FireFilled,
  FolderFilled,
  DashboardFilled
} from '@ant-design/icons'

export default function Home(list) {
  
  const [ mylist , setMylist ] = useState(list.data)
  const renderer = new marked.Renderer()
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
  return (
    <div className="page-opacity">
    <Head>
      <title>首页</title>
    </Head>
    <Header></Header>
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={14}  >
        
        <List
          header={<div>最新日记</div>}
          itemLayout="vertical"
          dataSource={mylist}
          renderItem={item=>(
            <div className="list-Item">
            <List.Item>
              <div className="list-title">
              <Link href={{pathname:'/detail',query:{id:item.id}}}>
               <a>{item.title}</a>
              </Link>
              </div>
              <div className="list-icon">
              <span><DashboardFilled /> {item.addTime}</span>
              <span><FolderFilled /> {item.typeName}</span>
              <span><FireFilled /> {item.view_count}人</span>
        </div>
        <div className="list-context"
             dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div> 
            </List.Item>
        </div>
          )}></List>
      </Col>

      <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author></Author>
        <Advert></Advert>
      </Col>
    </Row>
    <Footer></Footer>
 </div>
  )
}

Home.getInitialProps = async () => {
  const res = await axios.get(http.getArticleList)
  const list = res.data
  //console.log(list)
  return list
}