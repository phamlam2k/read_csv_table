import { Redirect, Route } from 'react-router-dom'
import { isAdmin, isUser } from '../config/function'
import { LOGIN, USER } from '../config/path'

const AdminRouter = ({ component: Component, path }) => {
  return (
    <Route
      path={path}
      component={(props) =>
        isAdmin() ? <Component {...props} /> : isUser() ? <Redirect to={USER} /> : <Redirect to={LOGIN} />
      }
    />
  )
}

export default AdminRouter
