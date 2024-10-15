export default function MobileView() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <div className="bg-white p-6 rounded-lg max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Mobile Device Detected</h1>
                <p className="text-gray-600">
                    It looks like you&apos;re using a mobile device! Please use a desktop or larger screen browser to continue using this app.
                </p>
            </div>
        </div>
    )
}