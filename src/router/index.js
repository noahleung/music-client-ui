import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main'
import SongsRecommend from '@/views/SongsRecommend'
import SongsDetails from '@/views/details/SongsDetails'
import AlbumDetails from '@/views/details/AlbumDetails'
import SingerDetails from '@/views/details/SingerDetails'
import Search from '@/views/search/Search'
import Rank from '@/views/Rank'
import LoginAndRegist from '@/views/LoginAndRegist'
import MusicPlayer from '@/components/MusicPlayer'
import Test from '@/views/test'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/MusicPlayer',
      name: 'MusicPlayer',
      component: MusicPlayer
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/SongsRecommend',
      children: [
        {
          path: '/SongsRecommend',
          name: 'SongsRecommend',
          component: SongsRecommend
        },
        {
          path: '/SongsDetails',
          name: 'SongsDetails',
          component: SongsDetails
        },
        {
          path: '/AlbumDetails',
          name: 'AlbumDetails',
          component: AlbumDetails
        },
        {
          path: '/SingerDetails',
          name: 'SingerDetails',
          component: SingerDetails
        },
        {
          path: '/Rank',
          name: 'Rank',
          component: Rank
        },
        {
          path: '/Search',
          name: 'Search',
          component: Search
        }
      ]
    },
    {
      path: '/LoginAndRegist',
      name: 'LoginAndRegist',
      component: LoginAndRegist
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    }
  ]
})
