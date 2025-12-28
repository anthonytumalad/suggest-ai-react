import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/auth/use-auth'

const ProtectedRoute: React.FC = () => {
    const { user, loading } = useAuth()

    if (loading) return null;

    if (user) {
        return <Outlet />;
    }

    return <Navigate to="/login" replace />
}

export { ProtectedRoute }