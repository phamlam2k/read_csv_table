import { lazy, Suspense } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { USER } from '../config/path'
import AdminRouter from './AdminRouter'
import PublicRouter from './PublicRouter'
import { routes } from './router'
import UserRouter from './UserRouter'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          {routes.map((route, key) => {
            const { component, path, isAdmin, restricted, isUser, exact } = route

            const params = {
              key,
              path,
              exact,
              component: lazy(() => new Promise((resolve) => setTimeout(() => resolve(component), 200))),
            }

            return isAdmin ? (
              <AdminRouter {...params} />
            ) : isUser ? (
              <UserRouter {...params} />
            ) : (
              <PublicRouter {...params} restricted={restricted} />
            )
          })}
          <UserRouter component={USER} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
