import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoute() {
  const { currentUser } = useSelector(state => state.user)
  // render children or sign in page
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' /> 
}
