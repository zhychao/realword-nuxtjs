const cookieparser=process.server?require('cookieparser'):undefined

export const state=()=>{
    return {
        user:null
    }
}

export const mutations={
    setUser(state,data){
        state.user=data
    }
}
export const actions={
    nuxtServerInit ({ commit }, { req }) {
        let user = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            user = JSON.parse(parsed.user)
          } catch (err) {
            // No valid cookie found
            console.log(err)
          }
        }
        commit('setUser', user)
      }
}