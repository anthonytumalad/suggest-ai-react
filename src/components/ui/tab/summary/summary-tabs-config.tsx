import type { ReactNode } from "react"
import type { FeedbackSummary } from "../../../../utilities/interfaces/feedback-interface"

interface Tab {
    key: string
    label: string
    content: ReactNode
}

function extractStructuredData(summary: any) {
    if (summary.summary && typeof summary.summary === "object") {
        return {
            data: summary.summary,
            feedback_count: summary.feedback_count,
            model: summary.model,
        }
    }

    return {
        data: {
            comprehensive_summary: typeof summary.summary === "string" ? summary.summary : "No summary available.",
        },
        feedback_count: summary.feedback_count,
        model: summary.model,
    }
}

export function getSummaryTabs(summary: FeedbackSummary | null): Tab[] {
    if (!summary) {
        return [
            {
                key: "loading",
                label: "Summary",
                content: (
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
                        <p className="text-gray-600">No summary available yet.</p>
                    </div>
                ),
            },
        ]
    }

    const { data, feedback_count, model } = extractStructuredData(summary)
    const hasStructuredData = data && typeof data === "object"

    if (!hasStructuredData || !data.comprehensive_summary) {
        return [
            {
                key: "summary",
                label: "Summary",
                content: (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-10 max-w-4xl mx-auto">
                        <p className="text-base leading-relaxed text-[#222831] whitespace-pre-line">
                            {data.comprehensive_summary || "Summary is being generated..."}
                        </p>
                        <div className="mt-8 text-center text-sm text-gray-600">
                            {feedback_count} feedback entries • Powered by {model}
                        </div>
                    </div>
                ),
            },
        ]
    }

    return [
        {
            key: "executive",
            label: "Summary",
            content: (
                <div 
                    className="
                        bg-white border border-[#222831]/10 rounded-2xl shadow-sm 
                        p-6 
                        tracking-normal text-[#222831]
                    "
                >

                    <p className="text-sm leading-relaxed text-[#222831] whitespace-pre-line mb-10">
                        {data.comprehensive_summary}
                    </p>

                    {data.overall_sentiment && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

                            <div className="">
                                <div className="text-base font-bold">
                                    {data.overall_sentiment.average_rating?.toFixed(1) ?? "N/A"}
                                </div>
                                <div className="text-sm text-[#545454] mt-1 italic">Average Rating</div>
                            </div>

                            <div className="">
                                <div className="text-base font-bold">
                                    {data.overall_sentiment.overall_sentiment || "Unknown"}
                                </div>
                                <div className="text-sm text-[#545454] mt-1 italic">Overall Sentiment</div>
                            </div>

                            <div className="">
                                <div className="text-base font-bold">
                                    {feedback_count}
                                </div>
                                <div className="text-sm text-[#545454] mt-1 italic">Total Feedbacks</div>
                            </div>

                        </div>
                    )}
                </div>
            ),
        },
        {
            key: "topics",
            label: "Topic Modeling",
            content: (
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
                    {data.topic_modeling?.map((topic: any, i: number) => (
                        <div
                            key={i}
                            className="
                                bg-white border border-[#222831]/10 rounded-2xl shadow-sm 
                                p-6 
                                tracking-normal text-[#222831]
                            "
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-base font-semibold text-[#222831]">{topic.topic_name}</h4>
                                <span
                                    className={`text-sm px-3 py-1 rounded-full font-medium ${topic.sentiment === "positive"
                                            ? "bg-green-100 text-green-800"
                                            : topic.sentiment === "negative"
                                                ? "bg-red-100 text-red-800"
                                                : topic.sentiment === "mixed"
                                                    ? "bg-amber-100 text-amber-800"
                                                    : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {topic.sentiment}
                                </span>
                            </div>
                            <p className="text-sm text-[#545454] mb-4">{topic.summary}</p>
                            <div className="text-sm text-[#545454] space-y-1">
                                <div className="italic">Avg Rating: {topic.average_rating?.toFixed(1)}</div>
                                <div className="italic">Frequency: ~{topic.frequency}%</div>
                            </div>
                            <div className="mt-4">
                                <h2 className="text-sm font-semibold text-[#222831] mb-2">Key phrases:</h2>
                                <div className="flex flex-wrap gap-2">
                                    {topic.keyphrases?.map((phrase: string, idx: number) => (
                                        <span key={idx} className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                                            {phrase}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            key: "sentiment",
            label: "Sentiment Analysis",
            content: (
                <div className="bg-white border border-[#222831]/10 rounded-2xl p-8">
                    {data.overall_sentiment && (
                        <>
                            <div className="grid md:grid-cols-2 gap-10 mb-10">
                                <div>
                                    <h4 className="font-semibold text-xl text-[#222831] mb-6">Overview</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Dominant Sentiment</span>
                                            <span className="font-bold">{data.overall_sentiment.overall_sentiment}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Sentiment Score</span>
                                            <span className="font-bold">
                                                {(data.overall_sentiment.sentiment_score ?? 0).toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Average Rating</span>
                                            <span className="font-bold">
                                                {data.overall_sentiment.average_rating.toFixed(1)} ★
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-xl text-[#222831] mb-6">Rating Distribution</h4>
                                    <div className="space-y-4">
                                        {[5, 4, 3, 2, 1].map((star) => (
                                            <div key={star} className="flex items-center gap-4">
                                                <span className="w-8 text-sm">{star}★</span>
                                                <div className="flex-1 bg-gray-200 rounded-full h-4">
                                                    <div
                                                        className="h-full bg-amber-500 rounded-full transition-all"
                                                        style={{
                                                            width: `${data.overall_sentiment.rating_distribution?.[star] ?? 0}%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="w-12 text-sm text-right">
                                                    {data.overall_sentiment.rating_distribution?.[star] ?? 0}%
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold text-green-800 mb-3">Positive Aspects</h4>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {data.overall_sentiment.positive_aspects?.map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-red-800 mb-3">Areas for Improvement</h4>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {data.overall_sentiment.negative_aspects?.map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {data.overall_sentiment.suggestions_summary && (
                                <div className="mt-8 pt-8 border-t border-[#222831]/10">
                                    <h4 className="font-semibold text-[#222831] mb-3">Suggestions Summary</h4>
                                    <p className="text-gray-700">{data.overall_sentiment.suggestions_summary}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ),
        },
        {
            key: "keyphrases",
            label: "Key Phrases",
            content: (
                <div className="bg-white border border-[#222831]/10 rounded-2xl p-8">
                    <div className="flex flex-wrap gap-4">
                        {data.keyphrase_extraction?.map((kp: any, i: number) => (
                            <div
                                key={i}
                                className="bg-gray-50 border border-[#222831]/10 rounded-xl px-5 py-4 min-w-[220px]"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <p className="font-medium text-[#222831] text-base">"{kp.phrase}"</p>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full font-medium ${kp.sentiment === "positive"
                                                ? "bg-green-100 text-green-800"
                                                : kp.sentiment === "negative"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {kp.sentiment}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-600 space-y-1">
                                    <div>Appears ~{kp.frequency} times</div>
                                    <div>• From: {kp.sources}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            key: "insights",
            label: "Insights",
            content: (
                <div className="space-y-8">
                    {data.role_insights && (
                        <div className="bg-white border border-[#222831]/10 rounded-2xl p-8">
                            <h4 className="font-semibold text-xl text-[#222831] mb-4">
                                Role-Based Insights
                            </h4>
                            <p className="text-gray-700 whitespace-pre-line">{data.role_insights}</p>
                        </div>
                    )}
                    {data.language_notes && (
                        <div className="bg-white border border-[#222831]/10 rounded-2xl p-8">
                            <h4 className="font-semibold text-xl text-[#222831] mb-4">
                                Language Observations
                            </h4>
                            <p className="text-gray-700 whitespace-pre-line">{data.language_notes}</p>
                        </div>
                    )}
                </div>
            ),
        },
    ]
}