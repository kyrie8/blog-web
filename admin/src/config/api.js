const Url = 'http://127.0.0.1:7001/admin/'
const http = {
  checkLogin:Url + 'checkLogin' , 
  getTypeInfo:Url + 'getTypeInfo',
  addArticle: Url + 'addArticle',
  updateArticle:Url + 'updateArticle' ,
  getArticleList:Url + 'getArticleList',
  getArticleListAll:Url + 'getArticleListAll',
  delArticle:Url + 'delArticle',
  getArticleById:Url+ 'getArticleById'
}
export default http