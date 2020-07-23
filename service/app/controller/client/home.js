'use strict';

const { consoleLevel } = require('egg-mock');

const Controller = require('egg').Controller;

class ClientController extends Controller {
  async updateHot(){
    console.log(this.ctx.query.view_count)
    let view_count = this.ctx.query.view_count
    let id =this.ctx.query.id
    const row = {
      id: id,
      view_count: view_count
    }
    const result = await this.app.mysql.update('article',row)
    const updateSuccess = result.affectedRows === 1
    this.ctx.body={
      isSuccess:updateSuccess
  }
  }

  async getArticleList() {
    const {ctx,app} = this
    let sql = 'SELECT article.id as id,'+
              'article.title as title,'+
              'article.introduce as introduce,'+
              'article.addTime as addTime,'+
              'article.view_count as view_count ,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id '+
              'ORDER BY article.id DESC '+
              'LIMIT 6'
              const results = await app.mysql.query(sql)

              ctx.body={
                  data:results
              }
  
    }
    async getArticleById(){
      const {ctx,app} = this
      
      const id = ctx.query.id
      //console.log(id)
      let sql = 'SELECT article.id as id,'+
      'article.title as title,'+
      'article.introduce as introduce,'+
      'article.article_content as article_content,'+
      'article.addTime as addTime,'+
      'article.view_count as view_count ,'+
      'type.typeName as typeName ,'+
      'type.id as typeId '+
      'FROM article LEFT JOIN type ON article.type_id = type.Id '+
      'WHERE article.id='+id

        
      const res = await app.mysql.query(sql)
      ctx.body = {data:res}
    }

  async getArticleInfo () {
    const {ctx,app} = this 
    const res= await app.mysql.select('type')
    ctx.body = {data:res}
  }

  async getListById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.addTime as addTime,'+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE type_id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}

}
async getArticleListMore(){
  let pageNum = this.ctx.query.page||1
  console.log(this.ctx.query.page)
  let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            'article.addTime as addTime,'+
            'article.view_count as view_count ,'+
            'type.typeName as typeName '+
            'FROM article LEFT JOIN type ON article.type_id = type.Id '+
            'ORDER BY article.id DESC '+
            'LIMIT 6 '+
            `OFFSET ${(pageNum - 1)*6}`
  const resList = await this.app.mysql.query(sql)
  this.ctx.body={data:resList}

  }
}
module.exports = ClientController;
