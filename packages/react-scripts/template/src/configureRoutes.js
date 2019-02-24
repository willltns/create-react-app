import { lazy } from 'react'

const Page1 = lazy(() => import('./containers/page1/Page1'))
const Page2 = lazy(() => import('./containers/page2/Page2'))

export default [
  {
    path: '/',
    exact: true,
    redirectTo: '/page1',
  },
  {
    path: '/page1',
    component: Page1,
  },
  {
    path: '/page2',
    component: Page2,
  },
]
