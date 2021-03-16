import Vue from 'vue'
import dayjs from 'dayjs'
Vue.filter('date',(value,formatType='YY-MM-DD HH:mm:ss')=>{
    return dayjs(value).format(formatType)
})