import { useState } from "react"
import { Dialog } from "./dialog"
import { Button } from "../button/button"
import { IconQrcode, IconLink, IconCopy, IconExternalLink } from '@tabler/icons-react'
import { showToast } from "../../../lib/toast"

interface ShareFormDialogProps {
    isOpen: boolean
    onClose: () => void
    title: string
    publicUrl: string
    qrCodeUrl: string
}

type Tab = 'link' | 'qrcode'

const ShareFormDialog: React.FC<ShareFormDialogProps> = ({
    isOpen,
    onClose,
    title,
    publicUrl,
    qrCodeUrl,
}) => {
    const [activeTab, setActiveTab] = useState<Tab>('link')

    const copyLink = () => {
        navigator.clipboard.writeText(publicUrl)
        showToast.success("Link copied to clipboard!")
    }

    const openInNewTab = () => {
        window.open(publicUrl, '_blank', 'noopener,noreferrer')
    }

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            aria-label="Share feedback form"
            width="max-w-lg"
        >
            <div className="tracking-normal text-[#222831]">
                <h3 className="text-base font-medium text-[#222831] text-center mb-6 pt-10">
                    Share: {title}
                </h3>

                <div className="flex border-b border-[#222831]/10">
                    <button
                        onClick={() => setActiveTab('link')}
                        className={`
                            flex-1 py-3 flex items-center justify-center gap-2 
                            text-sm font-medium transition
                            cursor-pointer
                            ${activeTab === 'link'
                                ? 'text-amber-500 border-b-2 border-amber-500'
                                : 'text-[#545454] hover:text-[#222831]'
                            }`
                        }
                    >
                        <IconLink size={18} />
                        Public Link
                    </button>
                    <button
                        onClick={() => setActiveTab('qrcode')}
                        className={`
                            flex-1 py-3 flex items-center justify-center gap-2 
                            text-sm font-medium transition
                            cursor-pointer
                            ${activeTab === 'qrcode'
                                ? 'text-amber-500 border-b-2 border-amber-500'
                                : 'text-[#545454] hover:text-[#222831]'
                            }`
                        }
                    >
                        <IconQrcode size={18} />
                        QR Code
                    </button>
                </div>

                {activeTab === 'link' && (
                    <div className="flex flex-col items-center p-6">
                        <p className="text-sm text-[#545454] text-center mb-6">
                            Anyone with this link can submit feedback
                        </p>

                        <div className="w-full bg-[#F7f7f7]/50 border border-[#222831]/10 rounded-lg p-2 mb-6">
                            <code className="text-sm text-[#222831] break-all">
                                {publicUrl}
                            </code>
                        </div>

                        <div className="flex items-center justify-center gap-3 w-full">
                            <Button 
                                variant="amber"
                                label="Copy Link"
                                onClick={copyLink}
                                size="md"
                                icon={<IconCopy size={17} />}
                            />
                            <Button 
                                variant="ghost"
                                label="Open Form"
                                onClick={openInNewTab}
                                size="md"
                                icon={<IconExternalLink size={17} />}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'qrcode' && (
                    <div className="flex flex-col items-center p-6">
                        <p className="text-sm text-[#545454] text-center mb-6">
                            Scan to submit feedback instantly
                        </p>

                        <img
                            src={qrCodeUrl}
                            alt="QR Code"
                            className="w-64 h-64 border border-gray-200 rounded-xl shadow-lg mb-6"
                        />

                        <p className="text-xs text-[#545454] break-all mb-6 px-4">
                            {publicUrl}
                        </p>

                        <div className="flex items-center justify-center gap-3 w-full">
                            <Button 
                                variant="amber"
                                label="Copy Link"
                                onClick={copyLink}
                                size="md"
                                icon={<IconCopy size={17} />}
                            />
                            <a
                                href={qrCodeUrl}
                                download={`qr-${title.replace(/\s+/g, '-').toLowerCase()}.png`}
                                className="
                                    flex items-center justify-center gap-2 
                                    rounded-full 
                                    font-medium transition-all duration-300 focus:outline-none h-8 text-sm tracking-normal w-30
                                    bg-white border border-[#222831]/15 text-[#222831]
                                "
                            >
                                Download QR
                            </a>
                        </div>
                    </div>
                )}
            </div>
            
        </Dialog>
    )

}

export { ShareFormDialog }