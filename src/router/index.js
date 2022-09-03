import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { USER } from '../config/path'
import AdminRouter from './AdminRouter'
import PublicRouter from './PublicRouter'
import { routes } from './router'
import UserRouter from './UserRouter'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, key) => {
          const { component, path, isAdmin, isUser } = route

          const params = {
            key,
            path,
            component: setTimeout(() => component, 1000),
          }

          return isAdmin ? (
            <AdminRouter {...params} />
          ) : isUser ? (
            <UserRouter {...params} />
          ) : (
            <PublicRouter {...params} />
          )
        })}
        <Route path={USER} />
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
