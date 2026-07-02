"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/lib/features/authSlice"
import {
    Loader2,
    Eye,
    EyeOff,
    ArrowLeft
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// @ts-ignore
import { signInWithGoogle } from "@/lib/firebaseAuth"
import { loginUser, registerUser, forgotPasswordUser, googleLoginUser } from "@/app/api/auth-service"

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const registerSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(10, { message: "Phone number is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
})

type LoginValues = z.infer<typeof loginSchema>
type RegisterValues = z.infer<typeof registerSchema>
type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export function AuthForm() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState<"login" | "register">("register")
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const loginForm = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const registerForm = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            password: "",
        },
    })

    const forgotPasswordForm = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onLoginSubmit(data: LoginValues) {
        setIsLoading(true)
        try {
            const res = await loginUser(data)
            const token = res?.accessToken || res?.token

            if (token) {
                dispatch(setCredentials({ user: res.user, token: token }))
                toast.success("Logged in successfully!")
                router.push("/")
                router.refresh()
            } else {
                toast.success("Logged in!")
                router.push("/")
            }
        } catch (error: any) {
            console.error("Login Error:", error)
            toast.error(error.response?.data?.message || "Login failed. Please check your credentials.")
        } finally {
            setIsLoading(false)
        }
    }

    async function onRegisterSubmit(data: RegisterValues) {
        setIsLoading(true)
        try {
            const payload = {
                name: data.fullName,
                email: data.email,
                phone: data.phone,
                password: data.password
            }
            const res = await registerUser(payload)
            toast.success("Registration successful! Please login.")
            setActiveTab("login")
        } catch (error: any) {
            console.error("Register Error:", error)
            toast.error(error.response?.data?.message || "Registration failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    async function onForgotPasswordSubmit(data: ForgotPasswordValues) {
        setIsLoading(true)
        try {
            await forgotPasswordUser(data.email)
            toast.success("Password reset link sent to your email.")
            setIsForgotPassword(false)
        } catch (error: any) {
            console.error("Forgot Password Error:", error)
            toast.error(error.response?.data?.message || "Failed to send reset link.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setIsLoading(true)
        try {
            const user = await signInWithGoogle()
            const idToken = await user.getIdToken()

            const payload = {
                token: idToken,
                user: {
                    name: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL,
                    uid: user.uid
                }
            }

            const res = await googleLoginUser(payload)
            if (res?.accessToken) {
                dispatch(setCredentials({ user: res.user, token: res.accessToken })) // Update Redux state
                toast.success("Google login successful!")
                router.push("/")
                router.refresh()
            } else {
                // If backend doesn't return a token but accepts the login
                // This path seems risky, but keeping existing logic with added dispatch if possible.
                // Assuming res.user exists even if token is missing in this specific branch,
                // otherwise we might need to rely on the firebase token.
                // For now, let's stick to the happy path where backend returns token.
                const fallbackUser = {
                    name: user.displayName || '',
                    email: user.email || '',
                    photoUrl: user.photoURL || '',
                    uid: user.uid
                };
                dispatch(setCredentials({ user: res?.user || fallbackUser, token: idToken }))
                toast.success("Google login successful!")
                router.push("/")
            }
        } catch (error: any) {
            console.error("Google Login Error:", error)
            toast.error("Google login failed.")
        } finally {
            setIsLoading(false)
        }
    }

    const GoogleIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="mr-2 h-4 w-4">
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
        </svg>
    )



    if (isForgotPassword) {
        return (
            <div className="flex flex-col h-full justify-center w-full max-w-md mx-auto">
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => setIsForgotPassword(false)}
                        className="mb-4 pl-0 hover:bg-transparent hover:text-[#1A4D2E]"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                    </Button>
                    <h1 className="text-3xl font-bold text-[#1A4D2E] font-serif">
                        Reset Password
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm">
                        Enter your email to receive a password reset link
                    </p>
                </div>

                <Form {...forgotPasswordForm}>
                    <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4">
                        <FormField
                            control={forgotPasswordForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-semibold">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Johndoe@gmail.com"
                                            className="h-11 rounded-md border-gray-200 focus:border-[#1A4D2E] focus:ring-[#1A4D2E] bg-white"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full h-11 rounded-md text-base bg-[#1A4D2E] hover:bg-[#143D24] text-white font-medium shadow-sm" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Send Reset Link
                        </Button>
                    </form>
                </Form>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full justify-center w-full max-w-md mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#1A4D2E] font-serif">
                    {activeTab === "login" ? "Welcome" : "Create Account"}
                </h1>
                <p className="text-muted-foreground mt-2 text-sm">
                    {activeTab === "login"
                        ? "Get started for a seamless shopping experience"
                        : "Join us for a seamless shopping experience"}
                </p>
            </div>

            <div className="mb-6">
                <Button
                    variant="outline"
                    className="w-full h-10 sm:h-11 border-gray-200 hover:bg-gray-50 hover:border-gray-300 bg-white transition-all shadow-sm rounded-lg text-sm sm:text-base font-medium"
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                    Continue with Google
                </Button>
            </div>

            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground font-medium tracking-wider">
                        Or continue with
                    </span>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "login" | "register")} className="w-full">
                <TabsList className="hidden">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                            <FormField
                                control={loginForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Johndoe@gmail.com"
                                                className="h-11 rounded-md border-gray-200 focus:border-[#1A4D2E] focus:ring-[#1A4D2E] bg-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={loginForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="At least 8 characters"
                                                    className="pr-12 h-11 rounded-md border-gray-200 focus:border-[#1A4D2E] focus:ring-[#1A4D2E] bg-white"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-3.5 text-muted-foreground hover:text-foreground focus:outline-none"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsForgotPassword(true)}
                                    className="text-xs text-muted-foreground hover:text-[#1A4D2E] hover:underline font-medium"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <Button type="submit" size="lg" className="w-full h-11 rounded-md text-base bg-[#1A4D2E] hover:bg-[#143D24] text-white font-medium shadow-sm" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Login
                            </Button>
                        </form>
                    </Form>
                </TabsContent>

                <TabsContent value="register">
                    <Form {...registerForm}>
                        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                            <FormField
                                control={registerForm.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold">Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                className="h-11 rounded-md border-gray-200 focus:border-[#1A4D2E] focus:ring-[#1A4D2E] bg-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={registerForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Johndoe@gmail.com"
                                                className="h-11 rounded-md border-gray-200 focus:border-[#1A4D2E] focus:ring-[#1A4D2E] bg-white"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={registerForm.control}
                                name="phone"
                                render={({ field: { onChange, value } }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold">Phone Number</FormLabel>
                                        <FormControl>
                                            <div className="[&_.react-tel-input_.form-control]:!w-full [&_.react-tel-input_.form-control]:!h-11 [&_.react-tel-input_.form-control]:!pl-12 [&_.react-tel-input_.form-control]:!text-base [&_.react-tel-input_.form-control]:!rounded-md [&_.react-tel-input_.form-control]:!border-gray-200 [&_.react-tel-input_.form-control]:!bg-white [&_.react-tel-input_.form-control]:!shadow-none [&_.react-tel-input_.flag-dropdown]:!rounded-l-md [&_.react-tel-input_.flag-dropdown]:!border-gray-200 [&_.react-tel-input_.flag-dropdown]:!bg-transparent [&_.react-tel-input_.selected-flag]:!bg-transparent [&_.react-tel-input_.selected-flag]:!pl-4">
                                                <PhoneInput
                                                    country={'in'}
                                                    value={value}
                                                    onChange={onChange}
                                                    inputProps={{
                                                        required: true,
                                                        name: 'phone',
                                                        placeholder: 'Phone Number'
                                                    }}
                                                    specialLabel=""
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={registerForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="At least 8 characters"
                                                    className="pr-12 h-11 rounded-md border-gray-200 focus:border-[#1A4D2E] focus:ring-[#1A4D2E] bg-white"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-3.5 text-muted-foreground hover:text-foreground focus:outline-none"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" size="lg" className="w-full h-11 rounded-md text-base bg-[#1A4D2E] hover:bg-[#143D24] text-white font-medium shadow-sm" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Register
                            </Button>
                        </form>
                    </Form>
                </TabsContent>
            </Tabs>

            <div className="mt-8 text-center text-sm text-foreground">
                {activeTab === "login" ? (
                    <>
                        Don&apos;t have an account?{" "}
                        <button
                            onClick={() => setActiveTab("register")}
                            className="text-[#1A4D2E] font-bold hover:underline underline-offset-4"
                        >
                            Register
                        </button>
                    </>
                ) : (
                    <>
                        Already have an account?{" "}
                        <button
                            onClick={() => setActiveTab("login")}
                            className="text-[#1A4D2E] font-bold hover:underline underline-offset-4"
                        >
                            Log in
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
