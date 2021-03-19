<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">拉钩教育123</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if='user' :class="{active:tab==='your_feed'}">
              <nuxt-link class="nav-link" exact :to="{name:'home',query:{tab:'your_feed'}}">Your Feed</nuxt-link>
            </li>
            <li class="nav-item" :class="{active:tab==='global_feed'}">
              <nuxt-link class="nav-link" exact :to="{name:'home',query:{tab:'global_feed'}}">Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <nuxt-link class="nav-link active" :to="{name:'home',query:{tab:'tag',tag:tag}}">#{{tag}}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="(article,index) in articles" :key="index">
          <div class="article-meta">
            <nuxt-link :to="{
              name:'profile',
              params:{
                username:article.author.username
              }
            }">
            <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
               <nuxt-link :to="{
                 name:'profile',
                  params:{
                    username:article.author.username
                     }
                  }" class="author">{{article.author.username}}</nuxt-link>
              <span class="date">{{article.createdAt|date}}</span>
            </div>
            <button :disabled='article.articleDisable' @click="clickFavorite(article)"
            :class="{
              active:article.favorited
            }" 
            class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="{
            name:'article',
            params:{
              slug:article.slug
            }
          }" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
        <nav>
  <ul class="pagination">

    <!-- ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
    <li v-for="item in totalPage" class="page-item" :class="{active:item===page}" :key="item">
      <nuxt-link class="page-link" :to="{
        name:'home',
        query:{
          page:item,
          tab:tab,
          tag:$route.query.tag
      }
    }">{{item}}</nuxt-link>
    </li>
  </ul>
</nav>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">
            <template  v-for="item in tags" >
              <nuxt-link class="tag-pill tag-default" :key='item' :to="{
                name:'home',
                query:{
                  tab:'tag',
                  tag:item
                }
              }">
              {{item}}
            </nuxt-link>
          </template>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import {getArticle,getArticleFeed,getFavorite,cancelFavorite} from '@/api/article.js'
import {getTags} from '@/api/tags.js'
import {mapState} from 'vuex'
export default {
  watchQuery:['page','tag','tab'],
  async asyncData({query,store}){
    const page=Number.parseInt(query.page||1)
    const limit=20
    const {tag}=query
    const tab=query.tab||'global_feed'
    const loadArticle=store.state.user&&tab==='your_feed'?getArticleFeed:getArticle
    const [ articlRes,tagsRes ]=await Promise.all([
        loadArticle({
        limit:20,
        tag,
        offect:(page-1)*2
      }),
      getTags()
    ])
    const {articles,articlesCount}=articlRes.data
    articles.forEach(articles => {
      articles.articleDisable=false
    });
    const {tags}=tagsRes.data
    return{
      articles,
      articlesCount,
      tags,
      page,
      limit,
      tag,
      tab:query.tab||'global_feed'
    }
  },
  computed:{
    ...mapState(['user']),
    totalPage(){
      return Math.ceil(this.articlesCount/this.limit)
    }
  },
  methods:{
    async clickFavorite(article){
      article.articleDisable=true
      if(article.favorited){
        await cancelFavorite(article.slug)
        article.favorited=false
        article.favoritesCount+=-1
      }else{
         await getFavorite(article.slug)
         article.favorited=true
         article.favoritesCount+=1
      }qq
      article.articleDisable=false
    }
  }
}
</script>

<style>

</style>