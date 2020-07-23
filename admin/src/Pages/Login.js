import React,{useState} from 'react';
import 'antd/dist/antd.css'
import { Spin,Card,Input,Button,message } from 'antd';

import {KeyOutlined,UserOutlined} from '@ant-design/icons'
import '../static/css/login.css'
import http from '../config/api'
import axios from 'axios'

function Login (props){
 
  const [userName , setUserName] = useState('')
  const [password , setPassword] = useState('')
  const checkLogin = async ()=>{
    if(!password||!userName){
      message.error('不能为空哦~~')
      return false
    }
    let dataProps = {
      'userName': userName,
      'password':password
    }
   const res = await axios({
      method: 'post',
      url: http.checkLogin,
      data: dataProps,
      withCredentials:true
      })
      if(res.data.data === '登录成功'){
        localStorage.setItem('openId',res.data.openId)
        props.history.replace('/AdminIndex')
      }else{
        message.error('就这点记忆力,还想写东西?')
    }
}
  return (
    <div className="login">
      <Spin spinning={false}>
        <Card title="qjLove" bordered={true} style={{ width: 400 }} >
          <Input
              id="userName"
              size="large"
              placeholder="Enter your userName"
              prefix={<UserOutlined />}
              onChange={(e)=>{setUserName(e.target.value)}}/> 
              <br/><br/>
          <Input.Password
              id="password"
              size="large"
              placeholder="Enter your password"
              prefix={<KeyOutlined />}
              onChange={(e)=>{setPassword(e.target.value)}}/>     
              <br/><br/>
          <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
          </Card>
      </Spin>
    </div>
  )
}
export default Login