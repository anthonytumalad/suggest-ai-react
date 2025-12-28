import { useState } from 'react'
import { useAuth } from "../../hooks/auth/use-auth"
import { Button } from '../../components/ui/button/button'
import { showToast } from '../../lib/toast'

export default function ViewLoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>("")
    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            await login(email, password)
        }
        catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.'
            setError(errorMessage)
            showToast.error(errorMessage)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex justify-center">
            <div className="space-y-6 w-full max-w-xl mt-26 p-6 md:p-0 lg:p-0">
                <div className="flex justify-center">
                    <img src="logo.png" alt="" className="h-15 mb-10" />
                </div>
                <div className="border p-4 rounded-xl border-[#222831]/15 bg-white">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-4">
                            <div className="flex gap-2">
                                <div className="flex flex-col flex-1 space-y-2">
                                    <label
                                        htmlFor="email"
                                        className={`text-sm font-medium tracking-normal 
                                            ${error ? 'text-red-500' : 'text-[#222831]'
                                        }`}
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className={`border text-[14px] text-[#222831] tracking-normal p-1.5 bg-[#F7f7f7]/50 pl-1 focus:outline-none rounded-md ${error
                                                ? "border-red-500 focus:border-red-500 focus:bg-red-50"
                                                : "border-[#222831]/15 focus:bg-amber-100"
                                        }`}
                                    />
                                </div>
                                <div className="flex flex-col flex-1 space-y-2">
                                    <label
                                        htmlFor="password"
                                        className={`text-sm font-medium tracking-normal 
                                            ${error ? 'text-red-500' : 'text-[#222831]'
                                        }`}
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className={`border text-[14px] text-[#222831] tracking-normal p-1.5 bg-[#F7f7f7]/50 pl-1 focus:outline-none rounded-md ${error
                                                ? "border-red-500 focus:border-red-500 focus:bg-red-50"
                                                : "border-[#222831]/15 focus:bg-amber-100"
                                        }`}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <input type="checkbox" name="remember_me" id="remember_me" />
                                    <label htmlFor="remember_me" className="text-sm tracking-normal font-medium text-[#545454]">Remember me</label>
                                </div>
                                <div>
                                    <a href="#" className="text-sm text-blue-400 hover:underline">Forgot password?</a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <Button
                                label="Login"
                                type="submit"
                                variant="amber"
                                size="md"
                                disabled={loading}
                                loading={loading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}