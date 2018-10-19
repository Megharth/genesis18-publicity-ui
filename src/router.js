import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Search from './views/Search'
import store  from './store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      beforeEnter: (destination, source, next) => {
        if(destination.name === 'Search')
          if(localStorage.user){
            store.state.user = JSON.parse(localStorage.getItem('user'))
            next()
          }
          else
            next(false)
        else
          next()
      }
    }
  ]
})
