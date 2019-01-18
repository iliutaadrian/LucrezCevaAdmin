import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/auth/Login';
import NotFound from '../components/page/NotFound'

import UserList from '../components/user/UserList';
import UserEdit from '../components/user/UserEdit';

import JobList from '../components/job/JobList';

import ChangePassword from '../components/user/ChangePassword';

import Statistics from '../components/statistics/Statistics';

Vue.use(Router);

export default new Router({
  routes: [
      {
          path: '/',
          component: Login
      },

      {
          path: '/users/list',
          component: UserList,
          meta:{
              requiresAuth: true
          }
      },
      {
          path: '/users/edit',
          component: UserEdit,
          meta:{
              requiresAuth: true
          }
      },

      {
          path: '/jobs/list',
          component: JobList,
          meta:{
              requiresAuth: true
          }
      },

      {
          path: '/change-password',
          component: ChangePassword,
          meta:{
              requiresAuth: true
          }
      },

      {
          path: '/statistics',
          component: Statistics,
          meta:{
              requiresAuth: true
          }
      },

      {
          path: '*',
          component: NotFound
      }
  ],
    mode: 'history'
})
