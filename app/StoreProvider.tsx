'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/lib/store'
import { initializeAuth } from '@/lib/features/authSlice'

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>(null)

    if (!storeRef.current) {
        storeRef.current = makeStore()
        storeRef.current.dispatch(initializeAuth())
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}
