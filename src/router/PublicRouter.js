import { Redirect, Route } from 'react-router-dom'
import { isAdmin, isUser } from '../config/function'
import { ADMIN, LOGIN, USER } from '../config/path'

const PublicRouter = ({ component: Component, path, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      path={path}
      component={(props) =>
        isAdmin() && !restricted ? (
          <Redirect to={ADMIN} />
        ) : isUser() && !restricted ? (
          <Redirect to={USER} />
        ) : path ? (
          <Component {...props} />
        ) : (
          <Redirect to={LOGIN} />
        )
      }
    />
  )
}

export default PublicRouter
