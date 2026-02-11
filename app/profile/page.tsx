
import Link from 'next/link'

export default function ProfilePage() {
    return (
        <div>
            <h1 className="text-2xl font-serif font-bold text-[#1a5f48] mb-8">Account Details</h1>

            <div className="bg-white rounded-lg border border-gray-100 p-6 mb-8 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 border-b border-gray-50 last:border-0">
                        <span className="text-sm font-medium text-gray-500">Name</span>
                        <span className="sm:col-span-2 text-sm font-semibold text-gray-900">Gau Krishna User</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 border-b border-gray-50 last:border-0">
                        <span className="text-sm font-medium text-gray-500">Email</span>
                        <span className="sm:col-span-2 text-sm font-semibold text-gray-900">user@example.com</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 border-b border-gray-50 last:border-0">
                        <span className="text-sm font-medium text-gray-500">Phone</span>
                        <span className="sm:col-span-2 text-sm font-semibold text-gray-900">+91 9876543210</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                    <h3 className="text-md font-semibold text-gray-700 mb-2">Total Orders</h3>
                    <p className="text-3xl font-bold text-[#1a5f48]">0</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                    <h3 className="text-md font-semibold text-gray-700 mb-2">Total Spent</h3>
                    <p className="text-3xl font-bold text-[#1a5f48]">₹0</p>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-serif font-bold text-[#1a5f48]">Default Address</h2>
                </div>

                <div className="bg-gray-50 rounded p-4 text-sm text-gray-500 mb-6 text-center italic border border-dashed border-gray-300">
                    No default address saved.
                </div>

                <Link
                    href="/profile/addresses"
                    className="inline-block px-6 py-2.5 bg-[#1a5f48] text-white text-sm font-medium rounded-md hover:bg-[#154d3b] transition-colors shadow-sm"
                >
                    View All Addresses (0)
                </Link>
            </div>
        </div>
    )
}
