module.exports = app =>{
  const {router,controller} = app
  const adminauth = app.middleware.adminauth()
  router.post('/admin/checkLogin',controller.admin.home.checkLogin)
  router.get('/admin/index' ,controller.admin.home.index)
  router.get('/admin/getTypeInfo',adminauth ,controller.admin.home.getTypeInfo)
  router.post('/admin/updateArticle',adminauth,controller.admin.home.updateArticle)
  router.post('/admin/addArticle',adminauth ,controller.admin.home.addArticle)
  router.get('/admin/getArticleList',adminauth,controller.admin.home.getArticleList)
  router.get('/admin/getArticleListAll',adminauth,controller.admin.home.getArticleListAll)
  router.get('/admin/delArticle',adminauth,controller.admin.home.delArticle)
  router.get('/admin/getArticleById',adminauth,controller.admin.home.getArticleById)
}