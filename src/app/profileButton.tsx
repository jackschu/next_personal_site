'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfileButton() {
    const [session, setSession] = useState(
        //        () => null
        typeof window !== 'undefined' ? localStorage.getItem('session') : null
    )

    const getSession = () => {
        const token = localStorage.getItem('session')
        if (token) {
            setSession(token)
        }
    }

    const signOut = () => {
        localStorage.removeItem('session')
        setSession(null)
    }

    useEffect(() => {
        getSession()
    }, [])

    useEffect(() => {
        const search = window.location.search
        const params = new URLSearchParams(search)
        const token = params.get('token')
        if (token) {
            localStorage.setItem('session', token)
            window.location.replace(window.location.origin)
            setSession(token)
        }
    }, [])

    const isStale = false
    const name = session ? session.slice(0, 3) : null
    const text = name == null ? 'sign in' : `hi ${name}`

    const login_link = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/authorize`
    const router = useRouter()

    return (
        <button
            type="button"
            disabled={isStale}
            onClick={
                session
                    ? () => signOut()
                    : (e) => {
                          router.push(login_link)
                      }
            }
            className={`has-tooltip ${
                isStale ? 'opacity-50' : ''
            } relative ml-1 h-7 rounded-full bg-accent px-2 text-xs text-[#1a1d16c4] lg:ml-2 lg:h-12 lg:px-3 lg:text-base`}
        >
            {name != null && (
                <div
                    role="tooltip"
                    className="tooltip right-0 mt-10 w-24 rounded-lg border border-gray-200 bg-white text-sm text-gray-500 opacity-0 shadow-sm transition-opacity duration-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 lg:left-1/2 lg:-translate-x-1/2"
                >
                    <div className="px-3 py-2">
                        <p>sign out</p>
                    </div>
                </div>
            )}
            {text}
        </button>
    )
}
