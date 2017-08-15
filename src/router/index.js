import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
// import WorkdayTable from '@/components/WorkdayTable'
import WCTable from '@/components/WCTable'
import Test from '@/components/Test'
import CalendarPage from '@/components/CalendarPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
    ,
    {
      path: '/CalendarPage',
      name: 'CalendarPage',
      component: CalendarPage
    }
    // ,
    // {
    //   path: '/WorkdayTable',
    //   name: 'WorkdayTable',
    //   component: WorkdayTable
    // }
    ,
    {
      path: '/WCTable',
      name: 'WCTable',
      component: WCTable
    }
    ,
    {
      path: '/Test',
      name: 'Test',
      component: Test
    }
  ]
})
