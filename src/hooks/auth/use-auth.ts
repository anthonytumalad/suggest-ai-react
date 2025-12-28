import { useState, useEffect } from 'react'
import { authService } from "../../services/auth-service"
import { useNavigate } from 'react-router-dom'
import type { AuthState } from "../../utilities/interfaces/auth-interface"

function useAuth() {
    const navigate = useNavigate()

    const [state, setState] = useState<AuthState>({
        user: null,
        loading: true,
        isAuthenticated: false,
    })

    const login = async (email: string, password: string) => {
        try {
            const user = await authService.login(email, password)
            setState({
                user,
                loading: false,
                isAuthenticated: true,
            })
            navigate('/dashboard')
        }
        catch (error) {
            throw error
        }
    }

    const logout = async () => {
        await authService.logout()
        setState({
            user: null,
            loading: false,
            isAuthenticated: false,
        })
    }

    const checkAuth = async () => {
        try {
            const user = await authService.getCurrentUser()
            setState({
                user,
                loading: false,
                isAuthenticated: !!user,
            })
        } catch {
            setState({
                user: null,
                loading: false,
                isAuthenticated: false,
            })
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return {
        ...state,
        login,
        logout,
        refetch: checkAuth,
    }
}

export { useAuth }