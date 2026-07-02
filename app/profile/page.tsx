'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/store'
import { updateProfile } from '@/app/api/user-service'
import { setCredentials } from '@/lib/features/authSlice'
import { toast } from 'sonner'
import { Edit2, Save, X, User as UserIcon, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ProfilePage() {
    const { user, token } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    })

    const validateName = (name: string): string | undefined => {
        if (!name || name.trim().length === 0) {
            return 'Name is required'
        }
        if (name.trim().length < 2) {
            return 'Name must be at least 2 characters'
        }
        if (name.trim().length > 50) {
            return 'Name must be less than 50 characters'
        }
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            return 'Name can only contain letters and spaces'
        }
        return undefined
    }

    const validatePhone = (phone: string): string | undefined => {
        if (!phone || phone.trim().length === 0) {
            return 'Phone number is required'
        }
        const digitsOnly = phone.replace(/\D/g, '')
        if (digitsOnly.length < 10) {
            return 'Phone number must be at least 10 digits'
        }
        if (digitsOnly.length > 15) {
            return 'Phone number must be less than 15 digits'
        }
        return undefined
    }

    const handleEditClick = () => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || ''
            })
        }
        setErrors({})
        setIsEditing(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setErrors({})
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFormData({ ...formData, name: value })
        if (errors.name) {
            setErrors({ ...errors, name: undefined })
        }
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFormData({ ...formData, phone: value })
        if (errors.phone) {
            setErrors({ ...errors, phone: undefined })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate all fields
        const nameError = validateName(formData.name)
        const phoneError = validatePhone(formData.phone)

        if (nameError || phoneError) {
            setErrors({
                name: nameError,
                phone: phoneError
            })
            return
        }

        setIsLoading(true)
        try {
            const updatedUser = await updateProfile(formData)
            // Update Redux state
            if (user && token) {
                dispatch(setCredentials({
                    user: { ...user, ...updatedUser },
                    token: token
                }))
            }
            toast.success('Profile updated successfully')
            setIsEditing(false)
            setErrors({})
        } catch (error: any) {
            console.error('Update profile error:', error)
            toast.error(error.response?.data?.message || 'Failed to update profile')
        } finally {
            setIsLoading(false)
        }
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Loading profile details...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a5f48]">Account Details</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your personal information</p>
                </div>
                {!isEditing && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEditClick}
                        className="flex items-center gap-2 text-[#1a5f48] border-[#1a5f48] hover:bg-[#dcf0e8] w-full sm:w-auto"
                    >
                        <Edit2 className="h-4 w-4" />
                        Edit Profile
                    </Button>
                )}
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#1a5f48] to-[#2a7f68] p-6 sm:p-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <UserIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <div className="text-white">
                            <h2 className="text-xl sm:text-2xl font-bold">{user.name || 'User'}</h2>
                            <p className="text-sm sm:text-base text-white/80 mt-1">{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 sm:p-8">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={handleNameChange}
                                        className={`pl-10 h-12 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                                    Phone Number <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        className={`pl-10 h-12 ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                                )}
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row gap-3">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-[#1a5f48] hover:bg-[#154d3b] text-white h-12 flex-1 sm:flex-none sm:min-w-[140px]"
                                >
                                    {isLoading ? (
                                        'Saving...'
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" /> Save Changes
                                        </>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                    className="h-12 flex-1 sm:flex-none sm:min-w-[100px]"
                                >
                                    <X className="mr-2 h-4 w-4" /> Cancel
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-5">
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                <UserIcon className="h-5 w-5 text-[#1a5f48] mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Full Name</p>
                                    <p className="text-base font-semibold text-gray-900 break-words">{user.name || 'Not provided'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                <Mail className="h-5 w-5 text-[#1a5f48] mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email Address</p>
                                    <p className="text-base font-semibold text-gray-900 break-words">{user.email || 'Not provided'}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                <Phone className="h-5 w-5 text-[#1a5f48] mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Phone Number</p>
                                    <p className="text-base font-semibold text-gray-900 break-words">{user.phone || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
