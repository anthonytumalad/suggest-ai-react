import { Button } from "../../components/ui/button/button"

export default function ViewRegisterForm() {
    return (
        <div className="min-h-screen flex justify-center">
            <div className="space-y-6 w-full max-w-lg mt-26 p-6 md:p-0 lg:p-0">
                <div className="border p-4 rounded-xl border-[#222831]/15 bg-white">
                    <form action="">
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col flex-1 space-y-2">
                                <label htmlFor="name" className="text-sm tracking-normal font-medium text-[#222831]">
                                    Enter your full name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="border text-[14px] text-[#222831] tracking-normal p-1.5 bg-[#F7f7f7]/50 pl-1 focus:bg-amber-100 focus:outline-none border-[#222831]/15 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col flex-1 space-y-2">
                                <label htmlFor="email" className="text-sm tracking-normal font-medium text-[#222831]">
                                    Enter your email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="border text-[14px] text-[#222831] tracking-normal p-1.5 bg-[#F7f7f7]/50 pl-1 focus:bg-amber-100 focus:outline-none border-[#222831]/15 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col flex-1 space-y-2">
                                <label htmlFor="password" className="text-sm tracking-normal font-medium text-[#222831]">
                                    Enter your password
                                </label>
                                <input
                                    type="text"
                                    name="password"
                                    id="password"
                                    className="border text-[14px] text-[#222831] tracking-normal p-1.5 bg-[#F7f7f7]/50 pl-1 focus:bg-amber-100 focus:outline-none border-[#222831]/15 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col flex-1 space-y-2">
                                <label htmlFor="confirm-password" className="text-sm tracking-normal font-medium text-[#222831]">
                                    Confirm your password
                                </label>
                                <input
                                    type="text"
                                    name="confirm-password"
                                    id="confirm-password"
                                    className="border text-[14px] text-[#222831] tracking-normal p-1.5 bg-[#F7f7f7]/50 pl-1 focus:bg-amber-100 focus:outline-none border-[#222831]/15 rounded-md"
                                />
                            </div>
                        </div>
                         <div className="mt-8 flex justify-end">
                            <Button
                                label="Submit"
                                type="submit"
                                variant="amber"
                                size="md"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}