const Url = 'http://127.0.0.1:7001/client/'
const http = {
  getArticleList:Url + 'getArticleList' ,  //  首页文章列表接口
  getArticleById:Url + 'getArticleById/',
  getArticleInfo: Url + 'getArticleInfo',
  getListById: Url + 'getListById/',
  getArticleListMore:Url + 'getArticleListMore' , 
  updateHot:Url + 'updateHot' ,
  
}
export default http