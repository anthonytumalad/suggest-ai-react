import { useState } from "react";

export default function ViewFeedbackForm() {
    const [isAnonymous, setIsAnonymous] = useState("1")
    const [role, setRole] = useState("")
    const [rating, setRating] = useState("")

    return (
        <div className="flex justify-center min-h-screen p-10">
            <div className="w-full max-w-xl space-y-3 italic contain-content">

                <div
                    className="
                        bg-white 
                        tracking-normal text-[#222831] 
                        border border-[#222832]/15 rounded
                    "
                >
                    <div className="p-6 space-y-4">
                        <h1 className="text-2xl font-semibold">
                            Faculty
                        </h1>
                        <p className="text-base font-normal text-[#545454]">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem natus, nemo dicta non quo explicabo ullam repudiandae magni. Odit dolor aspernatur aliquid natus similique dolorum in, eius ab accusamus sunt.
                        </p>
                    </div>
                    <div className="border-t border-[#222832]/15">
                        <div className="px-6 py-4">
                            <span className="text-sm tracking-normal text-[#222831]">
                                You logged in as <span className="text-blue-500">anthony@example.com</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div
                    className="
                        bg-white p-6 
                        border border-[#222832]/15 rounded
                    "
                >
                    <ul
                        className="list-disc pl-3 tracking-normal text-[#222831] text-base font-normal space-y-2"
                    >
                        <li>
                            Only verified school users can access this form.
                        </li>
                        <li>
                            You may choose to submit your feedback anonymously.
                        </li>
                    </ul>
                </div>

                <form
                    action=""
                    className="space-y-2.5"
                >

                    <div
                        className="
                        bg-white p-6 
                        tracking-normal text-[#222831] text-base font-semibold
                        border border-[#222832]/15 rounded
                        flex flex-col gap-6
                    "
                    >
                        <span className="">
                            Submission Preference <span className="text-red-500">*</span>
                        </span>

                        <div className="flex flex-col gap-6">
                            <label htmlFor="" className="flex items-center gap-2 font-normal">
                                <input
                                    type="radio"
                                    name="is_anonymous"
                                    value="1"
                                    checked={isAnonymous === "1"}
                                    onChange={() => setIsAnonymous("1")}
                                    className="form-radio cursor-pointer"
                                />
                                Submit anonymously
                            </label>
                            <label htmlFor="" className="flex items-center gap-2 font-normal">
                                <input
                                    type="radio"
                                    name="is_anonymous"
                                    value="0"
                                    checked={isAnonymous === "0"}
                                    onChange={() => setIsAnonymous("0")}
                                    className="form-radio cursor-pointer"
                                />
                                Share my identity (optional)
                            </label>
                        </div>
                        <p className="font-normal text-[#545454]">If you choose anonymous, your identity will not be stored.</p>
                    </div>

                    <div
                        className="
                            bg-white p-6 
                            tracking-normal text-[#222831] text-base font-semibold
                            border border-[#222832]/15 rounded
                            flex flex-col gap-6
                        "
                    >
                        <span>
                            Your Role <span className="text-red-500">*</span>
                        </span>

                        <div className="flex flex-col gap-6">
                            {["student", "teacher", "staff"].map((r) => (
                                <label key={r} className="flex items-center gap-2 font-normal">
                                    <input
                                        type="radio"
                                        name="role"
                                        value={r}
                                        checked={role === r}
                                        onChange={() => setRole(r)}
                                        className="form-radio cursor-pointer"
                                        required
                                    />
                                    {r.charAt(0).toUpperCase() + r.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div
                        className="
                            bg-white p-6 
                            tracking-normal text-[#222831] text-base font-semibold
                            border border-[#222832]/15 rounded
                            flex flex-col gap-6
                        "
                    >
                        <span>
                            Overall Experience <span className="text-red-500">*</span>
                        </span>

                        <div className="flex flex-col gap-6">
                            {["Very Negative", "Negative", "Neutral", "Positive", "Very Positive"].map(
                                (label, idx) => (
                                    <label key={idx} className="flex gap-2 font-normal">
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={idx + 1}
                                            checked={rating === String(idx + 1)}
                                            onChange={() => setRating(String(idx + 1))}
                                            className="form-radio cursor-pointer mb-1"
                                            required
                                        />
                                        {label}
                                    </label>
                                )
                            )}
                        </div>
                    </div>

                    <div
                        className="
                            bg-white p-6 
                            tracking-normal text-[#222831] text-base font-semibold
                            border border-[#222832]/15 rounded
                            flex flex-col gap-6
                        "
                    >
                        <label htmlFor="feedback">Overall Feedback</label>
                        <textarea
                            name="feedback"
                            id="feedback"
                            rows={5}
                            className="w-full bg-gray-100 p-2 font-normal focus:outline-none focus:bg-amber-100 rounded text-[#222831]"
                            required
                            placeholder="Share your feedback..."
                        >
                        </textarea>
                    </div>

                    <div
                        className="
                            bg-white p-6 
                            tracking-normal text-[#222831] text-base font-semibold
                            border border-[#222832]/15 rounded
                            flex flex-col gap-6
                        "
                    >
                        <label htmlFor="suggestions">Suggestions (Optional)</label>
                        <textarea
                            name="suggestions"
                            id="suggestions"
                            rows={5}
                            className="w-full bg-gray-100 p-2 font-normal focus:outline-none focus:bg-amber-100 rounded text-[#222831]"
                            required
                            placeholder="Share your feedback..."
                        >
                        </textarea>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-amber-400 text-white font-medium py-2 px-4 rounded cursor-pointer text-sm"
                        >
                            Submit
                        </button>
                        <button className="font-medium py-2 px-4 rounded cursor-pointer text-sm">
                            Clear form
                        </button>
                    </div>

                </form>

                <h1 className="text-center font-semibold mt-20 text-md text-[#222831] not-italic">SuggestAI</h1>

            </div>
        </div>
    )
}