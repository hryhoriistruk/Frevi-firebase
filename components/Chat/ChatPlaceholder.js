export default function ChatPlaceholder() {
    return (
        <div className="flex items-center justify-center h-full bg-gray-50">
            <div className="text-center p-6">
                <h3 className="text-lg font-medium text-gray-900">No chat selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Select a conversation from the list to begin messaging
                </p>
            </div>
        </div>
    )
}