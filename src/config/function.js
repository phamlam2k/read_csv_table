import { ADMIN, USER } from './path'

export const isAdmin = () => {
  return !!localStorage.getItem(ADMIN)
}

export const isUser = () => {
  return !!localStorage.getItem(USER)
}
