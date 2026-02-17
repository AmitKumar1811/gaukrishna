'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, CheckCircle, Loader2, MapPin, Home as HomeIcon, Briefcase, MoreHorizontal, X } from 'lucide-react'
import { userService, Address } from '@/lib/user-service'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const initialFormState: Partial<Address> = {
        type: 'Home',
        isDefault: false,
        name: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
    }

    const [formData, setFormData] = useState<Partial<Address>>(initialFormState)

    // Validation functions
    const validateName = (name: string): string | undefined => {
        if (!name || name.trim().length === 0) return 'Name is required'
        if (name.trim().length < 2) return 'Name must be at least 2 characters'
        if (name.trim().length > 50) return 'Name must be less than 50 characters'
        if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces'
        return undefined
    }

    const validatePhone = (phone: string): string | undefined => {
        if (!phone || phone.trim().length === 0) return 'Phone number is required'
        const digitsOnly = phone.replace(/\D/g, '')
        if (digitsOnly.length < 10) return 'Phone number must be at least 10 digits'
        if (digitsOnly.length > 15) return 'Phone number must be less than 15 digits'
        return undefined
    }

    const validateAddress = (address: string): string | undefined => {
        if (!address || address.trim().length === 0) return 'Address is required'
        if (address.trim().length < 5) return 'Address must be at least 5 characters'
        if (address.trim().length > 200) return 'Address must be less than 200 characters'
        return undefined
    }

    const validateCity = (city: string): string | undefined => {
        if (!city || city.trim().length === 0) return 'City is required'
        if (city.trim().length < 2) return 'City must be at least 2 characters'
        if (!/^[a-zA-Z\s]+$/.test(city)) return 'City can only contain letters and spaces'
        return undefined
    }

    const validateState = (state: string): string | undefined => {
        if (!state || state.trim().length === 0) return 'State is required'
        if (state.trim().length < 2) return 'State must be at least 2 characters'
        if (!/^[a-zA-Z\s]+$/.test(state)) return 'State can only contain letters and spaces'
        return undefined
    }

    const validatePincode = (pincode: string): string | undefined => {
        if (!pincode || pincode.trim().length === 0) return 'Pincode is required'
        const digitsOnly = pincode.replace(/\D/g, '')
        if (digitsOnly.length !== 6) return 'Pincode must be 6 digits'
        return undefined
    }

    const fetchAddresses = async () => {
        try {
            const data = await userService.getAddresses()
            setAddresses(data)
        } catch (error) {
            console.error('Failed to fetch addresses:', error)
            toast.error('Failed to load addresses')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAddresses()
    }, [])

    const handleAddNew = () => {
        setFormData(initialFormState)
        setEditingId(null)
        setErrors({})
        setShowForm(true)
    }

    const handleEdit = (address: Address) => {
        setFormData(address)
        setEditingId(address._id || address.id || null)
        setErrors({})
        setShowForm(true)
    }

    const handleFieldChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value })
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate all fields
        const validationErrors: Record<string, string> = {}

        const nameError = validateName(formData.name || '')
        if (nameError) validationErrors.name = nameError

        const phoneError = validatePhone(formData.phone || '')
        if (phoneError) validationErrors.phone = phoneError

        const addressError = validateAddress(formData.addressLine1 || '')
        if (addressError) validationErrors.addressLine1 = addressError

        const cityError = validateCity(formData.city || '')
        if (cityError) validationErrors.city = cityError

        const stateError = validateState(formData.state || '')
        if (stateError) validationErrors.state = stateError

        const pincodeError = validatePincode(formData.pincode || '')
        if (pincodeError) validationErrors.pincode = pincodeError

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            toast.error('Please fix the errors in the form')
            return
        }

        setIsSubmitting(true)

        try {
            if (editingId) {
                await userService.updateAddress(editingId, formData)
                toast.success('Address updated successfully')
            } else {
                await userService.addAddress(formData as Omit<Address, '_id' | 'id'>)
                toast.success('Address added successfully')
            }

            await fetchAddresses()
            setShowForm(false)
            setFormData(initialFormState)
            setEditingId(null)
            setErrors({})
        } catch (error: any) {
            console.error('Address operation failed:', error)
            toast.error(error.response?.data?.message || 'Failed to save address')
        } finally {
            setIsSubmitting(false)
        }
    }

    const [deleteId, setDeleteId] = useState<string | null>(null)

    const handleDeleteClick = (id: string) => {
        setDeleteId(id)
    }

    const confirmDelete = async () => {
        if (!deleteId) return

        try {
            await userService.deleteAddress(deleteId)
            toast.success('Address deleted successfully')
            setAddresses(addresses.filter((addr) => (addr._id || addr.id) !== deleteId))
            setDeleteId(null)
        } catch (error: any) {
            console.error('Delete address failed:', error)
            toast.error(error.response?.data?.message || 'Failed to delete address')
        }
    }

    const handleSetDefault = async (id: string) => {
        try {
            await userService.updateAddress(id, { isDefault: true })
            toast.success('Default address updated')
            fetchAddresses()
        } catch (error: any) {
            console.error('Set default address failed:', error)
            toast.error('Failed to update default address')
        }
    }

    const getAddressIcon = (type: string) => {
        switch (type) {
            case 'Home':
                return <HomeIcon className="h-5 w-5" />
            case 'Work':
                return <Briefcase className="h-5 w-5" />
            default:
                return <MoreHorizontal className="h-5 w-5" />
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-[#1a5f48]" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a5f48]">My Addresses</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your saved addresses</p>
                </div>
                {!showForm && (
                    <Button
                        onClick={handleAddNew}
                        className="bg-[#1a5f48] hover:bg-[#154d3b] text-white w-full sm:w-auto"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Address
                    </Button>
                )}
            </div>

            {/* Address Form */}
            {showForm && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-[#1a5f48]">
                            {editingId ? 'Edit Address' : 'Add New Address'}
                        </h3>
                        <button
                            onClick={() => {
                                setShowForm(false)
                                setEditingId(null)
                                setErrors({})
                            }}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={formData.name || ''}
                                    onChange={(e) => handleFieldChange('name', e.target.value)}
                                    className={`h-11 ${errors.name ? 'border-red-500' : ''}`}
                                    placeholder="Enter full name"
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                                    Phone Number <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone || ''}
                                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                                    className={`h-11 ${errors.phone ? 'border-red-500' : ''}`}
                                    placeholder="Enter phone number"
                                />
                                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                            </div>
                        </div>

                        {/* Address Line 1 */}
                        <div className="space-y-2">
                            <Label htmlFor="addressLine1" className="text-sm font-semibold text-gray-700">
                                Address Line 1 <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="addressLine1"
                                type="text"
                                value={formData.addressLine1 || ''}
                                onChange={(e) => handleFieldChange('addressLine1', e.target.value)}
                                className={`h-11 ${errors.addressLine1 ? 'border-red-500' : ''}`}
                                placeholder="House No., Building Name"
                            />
                            {errors.addressLine1 && <p className="text-sm text-red-500">{errors.addressLine1}</p>}
                        </div>

                        {/* Address Line 2 */}
                        <div className="space-y-2">
                            <Label htmlFor="addressLine2" className="text-sm font-semibold text-gray-700">
                                Address Line 2 (Optional)
                            </Label>
                            <Input
                                id="addressLine2"
                                type="text"
                                value={formData.addressLine2 || ''}
                                onChange={(e) => handleFieldChange('addressLine2', e.target.value)}
                                className="h-11"
                                placeholder="Road Name, Area, Colony"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            {/* City */}
                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-sm font-semibold text-gray-700">
                                    City <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="city"
                                    type="text"
                                    value={formData.city || ''}
                                    onChange={(e) => handleFieldChange('city', e.target.value)}
                                    className={`h-11 ${errors.city ? 'border-red-500' : ''}`}
                                    placeholder="City"
                                />
                                {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                            </div>

                            {/* State */}
                            <div className="space-y-2">
                                <Label htmlFor="state" className="text-sm font-semibold text-gray-700">
                                    State <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="state"
                                    type="text"
                                    value={formData.state || ''}
                                    onChange={(e) => handleFieldChange('state', e.target.value)}
                                    className={`h-11 ${errors.state ? 'border-red-500' : ''}`}
                                    placeholder="State"
                                />
                                {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                            </div>

                            {/* Pincode */}
                            <div className="space-y-2">
                                <Label htmlFor="pincode" className="text-sm font-semibold text-gray-700">
                                    Pincode <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="pincode"
                                    type="text"
                                    value={formData.pincode || ''}
                                    onChange={(e) => handleFieldChange('pincode', e.target.value)}
                                    className={`h-11 ${errors.pincode ? 'border-red-500' : ''}`}
                                    placeholder="Pincode"
                                    maxLength={6}
                                />
                                {errors.pincode && <p className="text-sm text-red-500">{errors.pincode}</p>}
                            </div>
                        </div>

                        {/* Address Type */}
                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-sm font-semibold text-gray-700">
                                Address Type
                            </Label>
                            <select
                                id="type"
                                value={formData.type}
                                onChange={(e) => handleFieldChange('type', e.target.value)}
                                className="w-full h-11 px-3 border border-gray-300 rounded-md focus:ring-[#1a5f48] focus:border-[#1a5f48] outline-none"
                            >
                                <option value="Home">Home</option>
                                <option value="Work">Work</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Default Checkbox */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isDefault"
                                checked={formData.isDefault}
                                onChange={(e) => handleFieldChange('isDefault', e.target.checked)}
                                className="accent-[#1a5f48] h-4 w-4 rounded"
                            />
                            <Label htmlFor="isDefault" className="text-sm text-gray-700 cursor-pointer">
                                Make this my default address
                            </Label>
                        </div>

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#1a5f48] hover:bg-[#154d3b] text-white h-11 flex-1 sm:flex-none sm:min-w-[140px]"
                            >
                                {isSubmitting ? 'Saving...' : editingId ? 'Update Address' : 'Save Address'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setShowForm(false)
                                    setEditingId(null)
                                    setErrors({})
                                }}
                                disabled={isSubmitting}
                                className="h-11 flex-1 sm:flex-none sm:min-w-[100px]"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Address List */}
            {addresses.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No addresses saved</h3>
                    <p className="text-gray-500 mb-6">Add your first address to get started</p>
                    <Button onClick={handleAddNew} className="bg-[#1a5f48] hover:bg-[#154d3b] text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Address
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                        <div
                            key={address._id || address.id}
                            className={`bg-white rounded-xl border-2 p-5 sm:p-6 transition-all hover:shadow-md ${address.isDefault ? 'border-[#1a5f48] bg-[#dcf0e8]/10' : 'border-gray-200'
                                }`}
                        >
                            {/* Address Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${address.isDefault ? 'bg-[#1a5f48] text-white' : 'bg-gray-100 text-gray-600'}`}>
                                        {getAddressIcon(address.type || 'Home')}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{address.type || 'Home'}</h3>
                                        {address.isDefault && (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1a5f48]">
                                                <CheckCircle className="h-3 w-3" />
                                                Default
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(address)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 className="h-4 w-4 text-gray-600" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(address._id || address.id || '')}
                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Address Details */}
                            <div className="space-y-2 text-sm text-gray-700 mb-4">
                                <p className="font-semibold text-gray-900">{address.name}</p>
                                <p>{address.addressLine1}</p>
                                {address.addressLine2 && <p>{address.addressLine2}</p>}
                                <p>
                                    {address.city}, {address.state} - {address.pincode}
                                </p>
                                <p className="font-medium">Phone: {address.phone}</p>
                            </div>

                            {/* Set Default Button */}
                            {!address.isDefault && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSetDefault(address._id || address.id || '')}
                                    className="w-full text-[#1a5f48] border-[#1a5f48] hover:bg-[#dcf0e8]"
                                >
                                    Set as Default
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <Trash2 className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Delete Address?</h3>
                            <p className="text-gray-500 mt-2">
                                Are you sure you want to delete this address? This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setDeleteId(null)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={confirmDelete}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
