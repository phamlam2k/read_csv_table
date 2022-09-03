import { Redirect, Route } from 'react-router-dom'
import { isAdmin, isUser } from '../config/function'
import { ADMIN, LOGIN } from '../config/path'

const UserRouter = ({ components: Component, path }) => {
  return (
    <Route
      path={path}
      component={(props) =>
        isUser() ? <Component {...props} /> : isAdmin() ? <Redirect to={ADMIN} /> : <Redirect to={LOGIN} />
      }
    />
  )
}

export default UserRouter
