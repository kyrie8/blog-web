import React,{useEffect, useState} from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col ,Input, Select ,Button ,DatePicker, message } from 'antd'
import axios from 'axios'
import http from '../config/api'
const { Option } = Select;
const { TextArea } = Input
function AddArticle(props){
  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate,setShowDate] = useState()   //发布日期
  //const [updateDate,setUpdateDate] = useState() //修改日志的日期
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState('类型') //选择的文章类别
  useEffect(()=>{
    getTypeInfo()
    //console.log(props.location.state)
    if(props.location.state!==undefined){
      
      setArticleId(props.location.state.id)
      getArticleById(props.location.state.id)
    }
  },[])
  

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });
  
  const changeContent = (e)=>{
    setArticleContent(e.target.value)
    let html=marked(e.target.value)
    setMarkdownContent(html)
}

  const changeIntroduce = (e)=>{
     setIntroducemd(e.target.value)
     let html=marked(e.target.value)
     setIntroducehtml(html)
 }
  
  const getTypeInfo = async ()=> {
    const res = await axios({
      method: 'get',
      url: http.getTypeInfo,
      withCredentials: true
    })
    if(res.data.data === '没有登录'){
      localStorage.removeItem('openId')
      props.history.replace('/login')
    }else{
      setTypeInfo(res.data.data)
    }
  }
  
  const SelHandleChange = (value) => {
    setSelectType(value)
  }
  
  const getArticleById = async (id)=>{
    const res = await axios({
        method:'get',
        url:http.getArticleById,
        params:{id},
        withCredentials: true,
        header:{ 'Access-Control-Allow-Origin':'*' }
    })
        setArticleTitle(res.data.data[0].title)
        setArticleContent(res.data.data[0].article_content)
        let html=marked(res.data.data[0].article_content)
        setMarkdownContent(html)
        setIntroducemd(res.data.data[0].introduce)
        let tmpInt = marked(res.data.data[0].introduce)
        setIntroducehtml(tmpInt)
        setShowDate(res.data.data[0].addTime)
        setSelectType(res.data.data[0].typeId)
  }
  const saveArticle = async () => {
    if(!selectedType || !articleTitle || !articleContent || !introducemd || !showDate){
      message.error('请确保填写每一项')
      return false
    }else{
      let dataProps = {}
      dataProps.type_id = selectedType 
      dataProps.title = articleTitle
      dataProps.article_content =articleContent
      dataProps.introduce =introducemd
      dataProps.addTime =showDate
      dataProps.view_count = 0
      if(articleId===0){
        const res = await axios ({
          method: 'post',
          url: http.addArticle,
          data:dataProps,
          withCredentials:true
        })
        if(res.data.isSuccess){
          setArticleId(res.data.insertId)
          message.success('ok')
        }else{
          message.error('failed')
        }
      }else{
        dataProps.id = articleId
        const res = await axios ({
          method: 'post',
          url: http.updateArticle,
          data:dataProps,
          withCredentials:true
        })
        if(res.data.isSuccess){
          message.success('ok')
        }else{
          message.error('failed')
        }
      }
    }
  }
  return (
    <div>
      <Row gutter={5} >
        <Col span={18}>
          <Row gutter={[40,16]} >
            <Col span={20}>
              <Input 
                value={articleTitle}
                placeholder="博客标题" 
                size="large"
                onChange={e=>{setArticleTitle(e.target.value)}} />
            </Col>
              <Col span={4}>
                
                <Select onChange={SelHandleChange} defaultValue={selectedType} size="large">
                
                {typeInfo.map((item,index)=>{
                  return( <Option key={index} value={item.Id}>{item.typeName}</Option>)
                })}
                </Select>
              </Col>
          </Row>
          
            <Row gutter={10} >
              <Col span={12}>
              <TextArea
               value={articleContent} 
               className="markdown-content" 
               rows={35}  
               onChange={changeContent} 
               onPressEnter={changeContent}
               placeholder="文章内容"/>
              </Col>
            <Col span={12}>
              <div 
              className="show-html"
              dangerouslySetInnerHTML = {{__html:markdownContent}}>
              </div>
            </Col>
          </Row>

        </Col>
      <Col span={6}>
      <Row gutter={[32,16]}>
      <Col span={24}>
        <Button  size="large" style={{marginRight:10}}>暂存文章</Button>
        <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
      </Col>
      <Col span={24}>
      <TextArea 
      rows={4} 
      value={introducemd}  
      onChange={changeIntroduce} 
      onPressEnter={changeIntroduce}
      placeholder="文章简介"/>
      <div className="introduce-html"
       dangerouslySetInnerHTML = {{__html:'文章简介：'+introducehtml}}>
      </div>
      </Col>
      <Col span={12}>
        <div className="date-select">
        <DatePicker
          onChange={(date,dateString)=>{setShowDate(dateString)}}
          placeholder="发布日期"
          size="large"/>
      </div>
      </Col>
      </Row>

    </Col>
   </Row>
  </div>
  )
}
export default AddArticle