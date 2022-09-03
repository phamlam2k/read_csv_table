import { ADMIN, USER } from './path'

export function isAdmin() {
  return !!localStorage.getItem(ADMIN)
}

export function isUser() {
  return !!localStorage.getItem(USER)
}
