import { ADMIN, LOGIN, USER } from '../config/path'

export const routes = [
  {
    path: LOGIN,
    component: import('../components/Auth/index'),
    isUser: false,
    isAdmin: false,
  },
  {
    path: USER,
    component: import('../components/User/Home/index'),
    isUser: true,
    isAdmin: false,
  },
  {
    path: ADMIN,
    component: import('../components/Admin/Home/index'),
    isUser: false,
    isAdmin: true,
  },
]
