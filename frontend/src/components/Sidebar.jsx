"use client"

export function Sidebar({
                            mainMenuItems = [],
                            otherMenuItems = [],
                        }) {
    return (
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
            {/* Main Menu Section */}
            {mainMenuItems.length > 0 && (
                <div className="px-4 pt-6">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">MAIN</p>
                    <nav className="space-y-1">
                        {mainMenuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={item.onClick}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    item.active
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </div>
                                {item.badge && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            )}

            {/* Other Menu Section */}
            {otherMenuItems.length > 0 && (
                <div className="px-4 mt-8">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">OTHER</p>
                    <nav className="space-y-1">
                        {otherMenuItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={item.onClick}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    item.active
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </div>
                                {item.badge && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    )
}
