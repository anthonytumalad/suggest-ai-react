import { useState } from "react"
import { UnderlinedTab } from "../underline-tab"
import { getSummaryTabs } from "./summary-tabs-config"
import type { FeedbackSummary } from "../../../../utilities/interfaces/feedback-interface"
import { useSaveSummary } from "../../../../hooks/useSaveSummary"
import { IconLoader2 } from "@tabler/icons-react"
import { Button } from "../../button/button"

interface SummaryTabProps {
    summary: FeedbackSummary | null
    slug: string
    isLoading?: boolean
    isPolling?: boolean
}

function SummaryTab({ summary, slug, isLoading = false, isPolling = false }: SummaryTabProps) {
    const saveMutation = useSaveSummary();
    const [activeTab, setActiveTab] = useState("summary")

    const handleSave = async () => {
        if (!summary || saveMutation.isPending) return

        saveMutation.mutate({
            slug,
            summaryData: summary.summary,        
            feedbackCount: summary.feedback_count,
            model: summary.model,
        })
    }

    if (isLoading || isPolling) {
        return (
            <div className="py-12">
                <div className="flex items-center justify-center gap-4">
                    <IconLoader2 size={24} stroke={2} className="animate-spin text-blue-500" />
                    <h3 className="text-xl font-medium tracking-normal text-[#222831]">
                        Generating AI Summary...
                    </h3>
                </div>
            </div>
        )
    }

    if (!summary) {
        return null
    }

    const tabs = getSummaryTabs(summary)

    return (
        <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-medium text-[#222831] tracking-normal">
                    AI-Powered Feedback Analysis
                    <span className="ml-3 text-sm font-normal text-gray-500">
                        ({summary.feedback_count} entries • Powered by {summary.model})
                    </span>
                </h3>
                <div className="flex items-center gap-2">
                    <Button 
                        variant="amber"
                        size="md"
                        label={saveMutation.isPending ? "Saving..." : "Save Summary"}
                        onClick={handleSave}
                        disabled={saveMutation.isPending || !summary}
                    />
                    <Button 
                        variant="ghost"
                        size="md"
                        label="Reset"
                    />
                </div>
            </div>

            <UnderlinedTab
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabs={tabs}
            />
        </div>
    )
}

export { SummaryTab }