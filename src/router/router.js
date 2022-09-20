import { ADMIN, LOGIN, USER } from '../config/path'

export const routes = [
  {
    path: LOGIN,
    component: import('../components/Auth/index'),
    isUser: false,
    isAdmin: false,
    exact: true,
    restricted: true,
  },
  {
    path: USER,
    component: import('../components/User/Home/index'),
    isUser: true,
    isAdmin: false,
    exact: true,
    restricted: false,
  },
  {
    path: ADMIN,
    component: import('../components/Admin/Home/index'),
    isUser: false,
    isAdmin: true,
    exact: true,
    restricted: false,
  },
]
