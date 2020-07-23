module.exports = app => {
  const { router, controller } = app;
  router.get('/client/getArticleList', controller.client.home.getArticleList);
  router.get('/client/getArticleById', controller.client.home.getArticleById);
  router.get('/client/getArticleInfo', controller.client.home.getArticleInfo);
  router.get('/client/getListById/:id',controller.client.home.getListById);
  router.get('/client/getArticleListMore', controller.client.home.getArticleListMore);
  router.get('/client/updateHot', controller.client.home.updateHot);
  
  
};