import React,{useState,useEffect} from 'react';
import '../static/css/ArticleList.css'
import {  Modal ,message ,Button, Table} from 'antd';
import axios from 'axios'
import  http  from '../config/api'
const { confirm } = Modal;


function ArticleList(props){

  const [list,setList]=useState([])
  
  const getListAll = async ()=>{
  const  result = await  axios({
                         method:'get',
                         url: http.getArticleListAll,
                         withCredentials: true,
                         header:{ 'Access-Control-Allow-Origin':'*' }})
                         console.log(result.data.list)
                         setList(result.data.list)}
    
    useEffect(()=>{
    getListAll()
  },[])
  
  const delArticle = (id)=>{
    confirm({
      title: '确定要删除这篇博客文章吗?',
      content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
      async onOk () {
        const res = await axios({
            method:'get',
            url: http.delArticle,
            params:{id},
            withCredentials: true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        })
        if(res){
          getListAll()
        }
      },
      onCancel() {
          message.success('没有任何改变')
      }
   })

  }

  const updateArticle = (id)=>{
    props.history.push({pathname:'/adminIndex/addArticle/' ,state:{id}})
}

  const listColumns = [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title:'类别',
      dataIndex: 'typeName'
    },
    {
      title: '发布时间',
      dataIndex: 'addTime'
    },
    {
      title: '浏览次数',
      dataIndex: 'view_count'
    },
    {
      title:'操作',
      dataIndex: 'id',
      render:(id) => {
        return(
          <span>
          <Button type='primary'  onClick={()=>updateArticle(id)}>修改</Button>
          <Button type="primary"
           danger style={{marginLeft:5}}
           onClick={()=>delArticle(id)}> 删除</Button>
        </span>
        )
      }
    }
  ]

  return (
      <div>
       <Table bordered
         dataSource={list}
         columns={listColumns}
         rowKey="id"
         defaultPageSize={6}>
       </Table>
      </div>
  )
}

export default ArticleList