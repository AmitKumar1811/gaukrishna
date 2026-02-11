export default function SettingsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input type="text" className="w-full px-3 py-2 border rounded-md" defaultValue="Gau" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input type="text" className="w-full px-3 py-2 border rounded-md" defaultValue="Krishna User" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" className="w-full px-3 py-2 border rounded-md" defaultValue="user@example.com" disabled />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="tel" className="w-full px-3 py-2 border rounded-md" defaultValue="+91 9876543210" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">Save Changes</button>
                        </div>
                    </form>
                </div>

                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input type="password" className="w-full px-3 py-2 border rounded-md" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input type="password" className="w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <input type="password" className="w-full px-3 py-2 border rounded-md" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Update Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
