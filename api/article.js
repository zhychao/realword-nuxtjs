import {request} from '@/plugins/request.js'

export const getArticle=params=>{
    return request({
        method:'GET',
        url:'/api/articles',
        params
    })
}

export const getArticleFeed=params=>{
    return request({
        method:'GET',
        url:'/api/articles/feed',
        params
    })
}

export const getFavorite=slug=>{
    return request({
        method:'POST',
        url:`/api/articles/${slug}/favorite`
    })
}

export const cancelFavorite=slug=>{
    return request({
        method:'DELETE',
        url:`/api/articles/${slug}/favorite`
    })
}

export const getArticles=slug=>{
    return request({
        method:'GET',
        url:`/api/articles/${slug}`
    })
}