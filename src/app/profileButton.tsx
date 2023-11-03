'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getUserInfo } from './getUserInfo'
import { useLocalStorage } from 'usehooks-ts'
import ProfileButtonRender from './profileButtonRender'

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

    const loginLink = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/authorize`

    const onClick = session
        ? () => signOut()
        : () => {
              if (pathname !== '/') {
                  setRedirectURL(window.location.href)
              } else {
                  setRedirectURL(window.location.origin)
              }
              router.push(loginLink)
          }
    return <ProfileButtonRender disabled={isStale} onClick={onClick} name={name} />
}
