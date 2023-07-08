'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getUserInfo } from './getUserInfo'
import { useLocalStorage } from 'usehooks-ts'

export default function ProfileButton() {
    const [session, setSession] = useState<null | { name: string }>(null)
    const [isLoading, setLoading] = useState(true)
    const pathname = usePathname()
    const [token, setToken] = useLocalStorage<string | null>('session', null)
    const [redirectURL, setRedirectURL] = useLocalStorage<string | null>('redirect', null)
    const searchParams = useSearchParams()

    const getSession = async () => {
        if (token) {
            const user = await getUserInfo(token)
            if (user && 'name' in user && typeof user.name === 'string')
                setSession({ name: user.name })
            else {
                setToken(null)
            }
        }
        setLoading(false)
    }

    const signOut = () => {
        setToken(null)
        setSession(null)
    }

    const router = useRouter()

    useEffect(() => {
        getSession()
    }, [token])

    const param_token = searchParams.get('token')
    useEffect(() => {
        if (param_token) {
            setToken(param_token)
            if (redirectURL) {
                setRedirectURL(null)
                router.push(redirectURL)
            }
        }
    }, [param_token, searchParams, router, setRedirectURL, redirectURL, setToken])

    const isStale = isLoading
    const name = session ? session.name : null
    const text = name == null ? 'sign in' : `hi ${name}`

    const loginLink = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/authorize`

    return (
        <button
            type="button"
            disabled={isStale}
            onClick={
                session
                    ? () => signOut()
                    : (e) => {
                          if (pathname !== '/') {
                              setRedirectURL(window.location.href)
                          } else {
                              setRedirectURL(window.location.origin)
                          }
                          router.push(loginLink)
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
