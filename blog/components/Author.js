import {Avatar,Divider} from 'antd'
import {
    GithubOutlined,
    WechatOutlined,
    WeiboCircleOutlined,
  } from '@ant-design/icons'
import '../public/style/components/author.css'


const Author =()=>{

    return (
        <div className="author-div comm-box page-opacity">
            <div className="header-icon"> <img src="../static/header.jpg" /></div>
            <div className="author-introduction">
            <div className="introduction">qjLove,一个前端小小白，喜欢曼联，喜欢电竞!</div>
                <Divider>社交账号</Divider>
                <div className="medium">
                <div className="Github"><Avatar  icon={<GithubOutlined />}  className="account "  /></div>
                <div className="Wechat"><Avatar  icon={<WechatOutlined />}  className="account" /></div>
                <div className="Weibo"><Avatar  icon={<WeiboCircleOutlined />}  className="account"  /></div>
                </div>

            </div>
        </div>
    )

}

export default Author