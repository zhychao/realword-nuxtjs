<template>
  <div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{article.title}}</h1>
     <article-meta :article='article'></article-meta>
    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body">
      </div>
    </div>

    <hr />

    <article-comments :article='article' />

  </div>

</div>
</template>

<script>
import {getArticles} from '@/api/article.js'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta.vue'
import ArticleComments from './components/article-comments.vue'
export default {
    name:'UserArticle',
    components:{
      ArticleMeta,
      ArticleComments,
    },
    async asyncData({params}){
      const {data}=await getArticles(params.slug)
      const {article}=data
      const md=new MarkdownIt()
      article.body=md.render(article.body)
      return{
        article
      }
    console.log(data)
    }
}
</script>

<style>

</style>