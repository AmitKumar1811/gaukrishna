'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, CheckCircle } from 'lucide-react'

interface Address {
    id: number
    type: 'Home' | 'Work' | 'Other'
    name: string
    phone: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    pincode: string
    isDefault: boolean
}

const initialAddresses: Address[] = [
    {
        id: 1,
        type: 'Home',
        name: 'John Doe',
        phone: '+91 9876543210',
        addressLine1: '123, Green Park Society',
        addressLine2: 'Near Central Mall',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380001',
        isDefault: true,
    },
    {
        id: 2,
        type: 'Work',
        name: 'John Doe (Office)',
        phone: '+91 9876543210',
        addressLine1: '456, Corporate Tech Park',
        addressLine2: 'Block B, 4th Floor',
        city: 'Gandhinagar',
        state: 'Gujarat',
        pincode: '382010',
        isDefault: false,
    },
]

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
    const [showAddForm, setShowAddForm] = useState(false)
    const [newAddress, setNewAddress] = useState<Partial<Address>>({
        type: 'Home',
        isDefault: false,
    })

    const handleAddAddress = (e: React.FormEvent) => {
        e.preventDefault()
        const address: Address = {
            ...(newAddress as Address),
            id: Date.now(),
        }
        setAddresses([...addresses, address])
        setShowAddForm(false)
        setNewAddress({ type: 'Home', isDefault: false })
    }

    const handleDelete = (id: number) => {
        setAddresses(addresses.filter((addr) => addr.id !== id))
    }

    const handleSetDefault = (id: number) => {
        setAddresses(
            addresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
            }))
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-serif font-bold text-[#1a5f48]">My Addresses</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1a5f48] text-white rounded hover:bg-[#154d3b] transition-colors"
                >
                    <Plus size={18} />
                    Add New Address
                </button>
            </div>

            {showAddForm && (
                <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-[#1a5f48] mb-4">Add New Address</h3>
                    <form onSubmit={handleAddAddress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-3 py-2 border rounded-md focus:ring-[#1a5f48] focus:border-[#1a5f48] outline-none"
                                value={newAddress.name || ''}
                                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                required
                                className="w-full px-3 py-2 border rounded-md focus:ring-[#1a5f48] focus:border-[#1a5f48] outline-none"
                                value={newAddress.phone || ''}
                                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                            <input
                                type="text"
                                required
                                className="w-full px-3 py-2 border rounded-md focus:ring-[#1a5f48] focus:border-[#1a5f48] outline-none"
                                value={newAddress.addressLine1 || ''}
                                onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-md focus:ring-[#1a5f48] focus:border-[#1a5f48] outline-none"
                                value={newAddress.addressLine2 || ''}
                                onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input
                                type="text"
                                required
                                className="w-full px-3 py-2 border rounded-md focus:ring-[#1a5f48] focus:border-[#1a5f48] outline-none"
                                value={newAddress.city || ''}
                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                            <input
                                type="text"
                                required
                                className="w-full px-3 py-2 border rounded-md focus:ring-[#1a5f48] focus:border-[#1a5f48] outline-none"
                                value={newAddress.state || ''}
                                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                            <input
                                type="text"
                                required
                                className="w-full px-3 py-2 border rounded-md focus:ring-[#1a5f48] focus:border-[#1a5f48] outline-none"
                                value={newAddress.pincode || ''}
                                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                            <select
                                className="w-full px-3 py-2 border rounded-md focus:ring-[#1a5f48] focus:border-[#1a5f48] outline-none"
                                value={newAddress.type}
                                onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value as any })}
                            >
                                <option value="Home">Home</option>
                                <option value="Work">Work</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#1a5f48] text-white rounded hover:bg-[#154d3b] transition-colors"
                            >
                                Save Address
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                    <div key={address.id} className={`border rounded-lg p-6 relative transition-all ${address.isDefault ? 'border-[#1a5f48] bg-[#dcf0e8]/10' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                        {address.isDefault && (
                            <div className="absolute top-4 right-4 text-[#1a5f48] flex items-center gap-1 text-xs font-bold bg-[#dcf0e8] px-2 py-1 rounded">
                                <CheckCircle size={14} />
                                Default
                            </div>
                        )}

                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-gray-100 text-gray-800 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                {address.type}
                            </span>
                        </div>

                        <h3 className="font-bold text-gray-900 mb-1">{address.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{address.phone}</p>

                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            {address.addressLine1}, {address.addressLine2 && <>{address.addressLine2}, <br /></>}
                            {address.city}, {address.state} - <strong>{address.pincode}</strong>
                        </p>

                        <div className="flex gap-4 pt-4 border-t border-gray-100">
                            <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#1a5f48] transition-colors">
                                <Edit2 size={14} />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(address.id)}
                                className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                            >
                                <Trash2 size={14} />
                                Delete
                            </button>
                            {!address.isDefault && (
                                <button
                                    onClick={() => handleSetDefault(address.id)}
                                    className="ml-auto text-sm font-medium text-[#1a5f48] hover:underline"
                                >
                                    Set as Default
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
