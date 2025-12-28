import { Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "../components/layouts/layout"
import { ProtectedRoute } from "./protected-route"
import { PublicRoute } from "./public-route"
import { LoadingProvider } from "../context/loading-context"
import ViewLoginForm from "../views/auth/view-login-form"
import ViewDashboard from "../views/forms/view-dashboard"
import ViewFormList from "../views/forms/view-form-list"
import ViewFeedbackForm from "../views/forms/view-feedback-form"
import ViewAddForm from "../views/forms/view-add-form"
// import ViewRegisterForm from "../views/auth/view-register-form"

export default function AppRoute() {
    return (
        <LoadingProvider>
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<ViewLoginForm />} />
                    {/* <Route path="/register" element={<ViewRegisterForm />} /> */}
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/dashboard" element={<ViewDashboard />} />
                        <Route path="/forms" element={<ViewFormList />} />
                        <Route path="/forms/add" element={<ViewAddForm />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Route>
                </Route>
                <Route path="/feedback-form" element={<ViewFeedbackForm />}></Route>
            </Routes>
        </LoadingProvider>
    )
}