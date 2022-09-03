import { Redirect, Route } from 'react-router-dom'
import { isAdmin, isUser } from '../config/function'
import { ADMIN, USER } from '../config/path'

const PublicRouter = ({ components: Component, path }) => {
  return (
    <Route
      path={path}
      component={(props) =>
        isAdmin() ? <Redirect to={ADMIN} /> : isUser() ? <Redirect to={USER} /> : <Component {...props} />
      }
    />
  )
}

export default PublicRouter
