import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/auth/use-auth'

const PublicRoute: React. FC = () => {
    const { user, loading } = useAuth()

    if (loading) return null

    return user ? <Navigate to="/dashboard" replace /> : <Outlet />
}

export { PublicRoute }